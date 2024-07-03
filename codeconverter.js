require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());

app.use(bodyParser.json());

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API key is missing. Please set the GOOGLE_API_KEY environment variable.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

app.post('/convert', async (req, res) => {
  const { code, targetLanguage } = req.body;

  if (!code || !targetLanguage) {
    return res.status(400).send('Invalid request payload');
  }

  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${code} Convert the above code to ${targetLanguage} without description.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    res.json({ convertedCode: text });
  } catch (error) {
    console.error("Error running the generative AI model:", error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
