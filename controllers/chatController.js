import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    // --- FIX: Use the standard 1.5 model ---
    // gemini-2.0-flash has a 0 limit for your account.
    // gemini-1.5-flash is the standard, free-tier friendly model.
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // Format History
    let formattedHistory = (history || []).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Remove "Welcome" message if present
    if (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
      formattedHistory.shift();
    }

    const chat = model.startChat({ history: formattedHistory });
    
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const reply = response.text();

    res.status(200).json({ reply });

  } catch (error) {
    console.error("🔥 BACKEND AI ERROR:", error);
    
    // Improved Error Handling for Quota Issues
    if (error.status === 429) {
       return res.status(429).json({ 
         error: "AI is busy", 
         details: "Quota limit reached. Please wait a moment." 
       });
    }

    res.status(500).json({ 
      error: "AI Generation Failed", 
      details: error.message 
    });
  }
};