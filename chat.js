
const readline = require('readline');
const axios = require('axios');

const botName = "YourBotName";

// Set the API key and base URL
const apiKey = 'sk-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKL';
const apiBase = 'https://4aiu6ctrknfxkoaigkigzh5lwm0cciuc.lambda-url.ap-east-1.on.aws';

// Set the request headers
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${apiKey}`,
};

// Function to send a request to GPT-4 and handle the response
const sendRequest = async (message) => {
  const payload = {
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  };

  try {
    const response = await axios.post(`${apiBase}/chat/completions`, payload, { headers });
    const assistantResponse = response.data.choices[0].message.content;
    console.log(`${botName}: ${assistantResponse}`);
  } catch (error) {
    console.error(error);
  }
};

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for input and send the request to GPT-4
const promptUser = () => {
  rl.question('User: ', (message) => {
    sendRequest(message).then(() => {
      promptUser();
    });
  });
};

// Start the conversation with a greeting
console.log(`${botName}: Hello! I am ${botName}. How can I assist you today?`);

// Start the conversation
promptUser();
