const { genkit } = require('genkit');
const { googleAI } = require('@genkit-ai/googleai');
require('dotenv').config();

const ai = genkit({
  plugins: [googleAI()],
});

async function main() {
  try {
    const response = await ai.generate({
      model: 'googleai/gemini-3.5-flash',
      prompt: 'Hello, respond with exactly "SUCCESS" if you can hear me.'
    });
    console.log('Success:', response.text);
  } catch (error) {
    console.error('Genkit Error Message:', error.message);
    console.error('Genkit Error Details:', error);
  }
}

main();
