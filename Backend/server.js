import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize the Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/generate", async (req, res) => {

  const { topic, category } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic required" });
  }

  try {
    const result = await groq.chat.completions.create({
      messages: [
        {
          // The System prompt strictly enforces the output format
          role: "system",
          content: `You are an expert AI prompt engineer. Your ONLY job is to output the final, ready-to-use prompt. 
          CRITICAL RULES:
          - DO NOT include any introductions, greetings, or conversational filler (e.g., do not say "Here is a high-quality prompt...").
          - DO NOT use labels like "Prompt:" or "Here you go:".
          - DO NOT wrap the output in quotes unless those quotes are meant to be part of the actual prompt.
          - Output ONLY the raw prompt text so the user can copy and paste it immediately.`
        },
        {
          // The User prompt passes in the dynamic data from your frontend
          role: "user",
          content: `Generate a high-quality ${category || ''} AI prompt about: ${topic}. Make the prompt clear, detailed, and useful for AI tools.`
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.6, // Keeps the AI focused on the rules and less conversational
    });

    // Extract the exact text from the response
    const response = result.choices[0]?.message?.content || "";

    res.json({ prompt: response });

  } catch (error) {
    console.error("Groq error:", error);

    res.status(500).json({
      error: "AI generation failed"
    });
  }

});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});