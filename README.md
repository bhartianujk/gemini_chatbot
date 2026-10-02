# Gemini React Chatbot — Vercel

Architecture: React -> /api/chat Vercel Function -> Gemini API.

## API key
1. Create a Gemini API key in Google AI Studio: https://aistudio.google.com/
2. In Vercel open Project -> Settings -> Environment Variables.
3. Add `GEMINI_API_KEY` with your real key.
4. Redeploy.

Do NOT put the key in `App.jsx`, and do not expose it as a frontend `VITE_*` variable.

## Deploy
Push this folder to GitHub and import the repository into Vercel.

## Colab
Colab is only needed for learning/testing Gemini separately. The deployed chatbot does not need Colab or FastAPI.
