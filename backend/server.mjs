// server.mjs
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// __dirname fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup for uploads
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// LowDB setup with default data
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, {
  signups: [],
  phrases: [],
  flashcards: []
});

// Read (and create) DB file with defaults
await db.read();

// Express setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- ROUTES ---

// 1. Signup
app.post('/api/signup', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

  await db.read();
  const newUser = { id: Date.now(), name, email };
  db.data.signups.push(newUser);
  await db.write();

  res.status(201).json({ message: 'Signup successful', user: newUser });
});

// 2. Save languages
app.post('/api/languages', async (req, res) => {
  const { userId, languages } = req.body;
  if (!userId || !Array.isArray(languages))
    return res.status(400).json({ error: 'userId and languages[] required' });

  await db.read();
  const user = db.data.signups.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.languages = languages;
  await db.write();
  res.json({ message: 'Languages saved', user });
});

// 3. Get all phrases
app.get('/api/phrases', async (req, res) => {
  await db.read();
  res.json(db.data.phrases);
});

// 4. Add a phrase (with optional image/audio)
app.post(
  '/api/phrases',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]),
  async (req, res) => {
    const { text, language } = req.body;
    if (!text || !language)
      return res.status(400).json({ error: 'Text and language are required.' });

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

// 5. Generate flashcards from phrases
app.post('/api/flashcards/generate', async (req, res) => {
  await db.read();
  db.data.flashcards = db.data.phrases.map(p => ({
    id: uuidv4(),
    phraseId: p.id,
    front: p.text,
    back: p.language,
    nextReview: new Date().toISOString(),
    interval: 1,
    ease: 2.5
  }));
  await db.write();
  res.json({ message: 'Flashcards generated', count: db.data.flashcards.length });
});

// 6. Get due flashcards
app.get('/api/flashcards', async (req, res) => {
  await db.read();
  const now = new Date();
  const due = db.data.flashcards.filter(f => new Date(f.nextReview) <= now);
  res.json(due);
});

// 7. Review a flashcard (SM-2 algorithm)
app.post('/api/flashcards/:id/review', async (req, res) => {
  const { quality } = req.body; // 0–5
  await db.read();
  const card = db.data.flashcards.find(f => f.id === req.params.id);
  if (!card) return res.status(404).json({ error: 'Flashcard not found' });

  // SM-2 spaced repetition update
  if (quality < 3) {
    card.interval = 1;
  } else {
    card.interval = Math.ceil(card.interval * card.ease);
    card.ease += 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    if (card.ease < 1.3) card.ease = 1.3;
  }
  const next = new Date();
  next.setDate(next.getDate() + card.interval);
  card.nextReview = next.toISOString();

  await db.write();
  res.json({ message: 'Review recorded', card });
});

// 8. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Lingolang backend running on http://localhost:${PORT}`);
});
