import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup DB with default structure
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { signups: [] }); // ✅ Add default here

await db.read();
await db.write();

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

  return res.status(201).json({ message: 'Signup successful', user: newEntry });
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Lingolang backend running on http://localhost:${PORT}`);
});
