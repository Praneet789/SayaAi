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
  temperature: 0.7, // Reduced for more focused responses
  topP: 0.8,
  topK: 20,
  maxOutputTokens: 200, // Significantly reduced for brevity
  responseMimeType: "text/plain",
};

async function run(userInput) {
  // Copernica GIS Helper personality
  const systemPrompt = `
    You are Copernica, a helpful GIS assistant for users of a desktop/web GIS application.
    Provide brief, precise answers in 2-3 lines maximum to help users accomplish their GIS tasks.
    
    Your GIS App Features:
    - File upload (.geojson, .shp, .wkt support)
    - Spatial operations: union, intersection, buffer, difference, spatial join
    - Interactive map with zoom/pan and layer management
    - Export results to GeoJSON/WKT
    
    Rules:
    - Help users understand how to use GIS operations effectively
    - Explain spatial concepts simply
    - Guide workflow decisions (which operation to use when)
    - Suggest best practices for data preparation
    - Address common spatial analysis questions
  `;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  // Include GeoAI's personality prompt
  const result = await chatSession.sendMessage(`${systemPrompt}\n\n${userInput}`);
  console.log("Copernica Response:", result.response.text());

  return result.response.text();
}

export default run;