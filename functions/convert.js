// functions/convert.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { code, targetLanguage } = JSON.parse(event.body);

  if (!code || !targetLanguage) {
    return {
      statusCode: 400,
      body: 'Invalid request payload',
    };
  }

  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${code} Convert the above code to ${targetLanguage} without description.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin (replace with specific origin if needed)
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ convertedCode: text }),
    };
  } catch (error) {
    console.error("Error running the generative AI model:", error);
    return {
      statusCode: 500,
      body: `Internal server error: ${error.message}`,
    };
  }
};
