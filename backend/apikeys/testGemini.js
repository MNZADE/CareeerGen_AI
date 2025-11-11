import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function testGemini() {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Hello Gemini 2.5 Pro! Please confirm my API setup works." },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  console.log("✅ Gemini API response:\n", JSON.stringify(data, null, 2));
}

testGemini();
