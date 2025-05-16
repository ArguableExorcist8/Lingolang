import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Multer for file uploads
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// Setup LowDB with default structure
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { signups: [], phrases: [] });

// Read DB once at startup (creates file with defaults if missing)
await db.read();

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST /api/signup
app.post('/api/signup', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  await db.read();
  const newEntry = { id: Date.now(), name, email };
  db.data.signups.push(newEntry);
  await db.write();

  res.status(201).json({ message: 'Signup successful', user: newEntry });
});

// POST /api/languages
app.post('/api/languages', async (req, res) => {
  const { userId, languages } = req.body;
  if (!userId || !Array.isArray(languages)) {
    return res.status(400).json({ error: 'userId and languages[] required' });
  }

  await db.read();
  const user = db.data.signups.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.languages = languages;
  await db.write();
  res.json({ message: 'Languages saved', user });
});

// GET /api/phrases
app.get('/api/phrases', async (req, res) => {
  await db.read();
  res.json(db.data.phrases);
});

// POST /api/phrases
app.post(
  '/api/phrases',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]),
  async (req, res) => {
    const { text, language } = req.body;
    if (!text || !language) {
      return res.status(400).json({ error: 'Text and language are required.' });
    }

    await db.read();
    const newPhrase = {
      id: Date.now(),
      text,
      language,
      image: req.files?.image?.[0]?.filename || null,
      audio: req.files?.audio?.[0]?.filename || null
    };

    db.data.phrases.push(newPhrase);
    await db.write();

    res.status(201).json({ message: 'Phrase added', phrase: newPhrase });
  }
);

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Lingolang backend running on http://localhost:${PORT}`);
});
