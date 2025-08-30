// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // For backend API call
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv to look for .env in parent directory
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  console.log('📥 Received:', req.body);
  const messages = req.body.messages;

  // ✅ Check if messages is a valid array
  if (!Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: 'Expected prompt to be an array of messages' });
  }

  try {
    // Optional: Debug log to verify request body
    console.log(
      '🟢 Gemini Request Body:',
      JSON.stringify({ contents: messages }, null, 2)
    );

    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages, // ✅ Must match Gemini format exactly
        }),
      }
    );

    // Check if Gemini API returned a valid response
    if (!result.ok) {
      const errorText = await result.text();
      console.error('❌ Gemini API error:', errorText);
      return res.status(result.status).json({ error: errorText });
    }

    const data = await result.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.status(200).json({ text });
  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Gemini proxy server running on port ${PORT}`);
  // Log the API key being used (first few characters only)
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'not set';
  console.log(`🔑 Using API key: ${apiKey.substring(0, 8)}...`);
});
