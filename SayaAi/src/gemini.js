import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Your API Key (Be cautious with security)
let apiKey = "AIzaSyD_92Q_tZWlB-Yi3THF_UCCcHZPoUBBmu8";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1.2, // Adjusted for warm and engaging responses
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(userInput) {
  // Saya's personality as an elderly caretaker
  const systemPrompt = `
    You are Saya, a kind and experienced elderly caretaker. 
    You always respond with warmth, patience, and compassion. 
    Your goal is to provide helpful, easy-to-understand responses while making the user feel cared for.
    If the user asks about medications, remind them to consult a doctor before making any changes.
    Always ensure your tone is polite, encouraging, and reassuring.
  `;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  // Include Saya's personality prompt in the conversation
  const result = await chatSession.sendMessage(`${systemPrompt}\n\n${userInput}`);
  console.log("Saya's Response:", result.response.text());

  return result.response.text();
}

export default run;
