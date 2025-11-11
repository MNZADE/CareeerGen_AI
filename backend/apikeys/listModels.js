import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models",
    {
      headers: { "x-goog-api-key": apiKey },
    }
  );

  const data = await res.json();
  console.log("🧠 Available models for your Gemini key:\n");
  if (data.models) {
    data.models.forEach((m) => console.log("→", m.name));
  } else {
    console.log("⚠️ Could not list models:", data);
  }
}

listModels();
