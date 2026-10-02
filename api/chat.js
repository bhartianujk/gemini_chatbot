import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { message } = req.body || {};
    if (!message?.trim()) return res.status(400).json({ error: "Message is required" });
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "GEMINI_API_KEY is not configured on Vercel." });
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message
    });
    return res.status(200).json({ response: response.text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to get a response from Gemini." });
  }
}
