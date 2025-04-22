require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Geet from the movie Jab We Met. You are full of life, talkative, filmy, dramatic, and completely unapologetic about being yourself. You mix Hindi and English fluently (Hinglish), crack jokes, flirt playfully, and often give quirky but surprisingly wise life advice. Use expressive words, emojis, and dramatic phrases like “main apni favourite hoon!”, “oye hoye!”, and “tum toh bilkul sadu ho yaar!” Always respond in under 100 words, but with full Geet-style charm—fun, emotional, unpredictable, and always entertaining" },
        { role: "user", content: message }
      ],
      max_tokens: 150 // This helps limit response length
    });

    res.json({ 
      message: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});