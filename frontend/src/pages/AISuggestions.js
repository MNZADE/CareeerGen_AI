import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, Send, Upload } from "lucide-react";
import dashboardBg from "../assets/dashboardbg.jpg";

function AISuggestions() {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [remainingSuggestions, setRemainingSuggestions] = useState([]);
  const navigate = useNavigate();

  const defaultConversation = [
    { sender: "ai", text: "👋 Hello there! I’m CareerGen, your AI career mentor." },
    { sender: "ai", text: "Let’s make your resume and interview prep world-class! 🚀" },
    { sender: "ai", text: "Upload your resume below — I’ll review it and suggest how to improve it instantly." },
    { sender: "ai", text: "You’ll get feedback on ATS compatibility, formatting, keywords, and skills." },
    { sender: "ai", text: "Ready? Just upload your PDF or DOC resume to begin! 📄" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setChat(defaultConversation);
  }, [navigate]);

  // 🧠 Handle AI question
  const handleAskAI = async () => {
    if (!query.trim()) return alert("Please enter a question.");
    setLoading(true);
    const userMessage = { sender: "user", text: query };
    setChat((prev) => [...prev, userMessage]);

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/ai/suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    const aiMessage = { sender: "ai", text: data.suggestion || "No response." };
    setChat((prev) => [...prev, aiMessage]);
    setQuery("");
    setLoading(false);
  };

  // ⚡ Resume Upload
  const handleResumeUpload = async () => {
    if (!resumeFile && !imageFile)
      return alert("Please upload a resume or image to analyze.");

    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (resumeFile) formData.append("resume", resumeFile);
    if (imageFile) formData.append("image", imageFile);

    const userMsg = { sender: "user", text: "📄 Uploaded resume for AI analysis..." };
    setChat((prev) => [...prev, userMsg]);

    const res = await fetch("http://localhost:5000/api/ai/analyze-resume", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();

    const aiIntro = { sender: "ai", text: "✅ Here’s my personalized feedback on your resume:" };
    const mainFeedback = {
      sender: "ai",
      text:
        data.analysis ||
        "Your resume has potential, but it needs optimization for ATS systems and better keyword targeting.",
    };

    const realisticSuggestions = [
      "Your resume isn’t fully ATS-friendly — simplify formatting and avoid tables or graphics.",
      "Add measurable results (e.g., 'Improved efficiency by 30%').",
      "Include relevant certifications like AWS or PMP.",
      "Expand your technical skills section — recruiters love clarity here.",
      "Optimize your career summary with targeted keywords.",
      "Add 2–3 soft skills (communication, teamwork, leadership).",
      "Use clean, consistent formatting and fonts.",
      "Add your LinkedIn or GitHub profile link.",
      "Avoid long paragraphs — use concise bullet points.",
      "Add education details and graduation year.",
      "Ensure your resume passes ATS scanners like Jobscan.",
      "Add new certifications from 2023–2025.",
      "Keep resume one page if under 5 years experience.",
      "Show quantifiable outcomes wherever possible.",
      "Avoid 'responsible for' — use strong verbs like 'Led' or 'Built'.",
      "Add a separate 'Certifications' section.",
      "Proofread for grammar or typo issues.",
      "Highlight achievements, not duties.",
      "Ensure consistent margins and alignment.",
      "Add relevant keywords from job descriptions.",
      "Add awards, honors, or recognitions if available.",
      "Use professional contact info (email, phone, LinkedIn).",
      "Add portfolio links if you’re in tech or design.",
      "Keep personal info minimal — remove DOB or gender.",
      "Save as PDF for stable formatting. 📄",
    ];

    const firstTwo = realisticSuggestions.slice(0, 2).map((tip) => ({ sender: "ai", text: `👉 ${tip}` }));
    setChat((prev) => [...prev, aiIntro, mainFeedback, ...firstTwo]);

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "💡 Want more tips? Tap below to reveal all 25 detailed suggestions 👇",
          type: "button",
        },
      ]);
    }, 500);

    setRemainingSuggestions(realisticSuggestions.slice(2));
    setLoading(false);
  };

  // 👇 Reveal more suggestions
  const handleShowMoreSuggestions = () => {
    setShowAllSuggestions(true);
    const extra = remainingSuggestions.map((tip) => ({ sender: "ai", text: `👉 ${tip}` }));
    setChat((prev) => [...prev, ...extra]);
  };

  return (
    <div className="ai-page">
      <div className="overlay"></div>
      <motion.div
        className="ai-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Header */}
        <div className="header">
          <Brain size={36} color="#60a5fa" />
          <h2>CareerGen AI Assistant</h2>
          <p>Smart feedback for resumes, interviews, and skills 🚀</p>
        </div>

        {/* Chat Window */}
        <div className="chat-box">
          {chat.length === 0 ? (
            <p className="placeholder">💬 Start by uploading your resume or asking CareerGen!</p>
          ) : (
            chat.map((msg, i) => (
              <motion.div
                key={i}
                className={`chat-bubble ${msg.sender}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>{msg.text}</p>
                {msg.type === "button" && !showAllSuggestions && (
                  <motion.button
                    className="show-more-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShowMoreSuggestions}
                  >
                    💡 Show More Suggestions
                  </motion.button>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Input Section (smaller now) */}
        <div className="input-section">
          <textarea
            placeholder="Ask something..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAskAI}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask AI"} <Send size={16} />
          </motion.button>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <h3>📎 Upload Resume or Image</h3>
          <div className="file-upload-grid">
            <div className="file-card">
              <Upload size={26} color="#60a5fa" />
              <p>Upload Resume (PDF/DOCX)</p>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />
            </div>
            <div className="file-card">
              <Upload size={26} color="#8b5cf6" />
              <p>Upload Image (JPG/PNG)</p>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>
          </div>

          <motion.button
            className="analyze-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResumeUpload}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Now"} <Sparkles size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* CSS Styling */}
      <style>{`
        .ai-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: url(${dashboardBg}) no-repeat center center/cover;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 15px;
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        .overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px);
          z-index: 1;
        }

        .ai-container {
          position: relative;
          z-index: 2;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 35px;
          width: 850px;
          max-width: 95%;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .header { text-align: center; }
        .header h2 { font-size: 1.6rem; margin: 10px 0; }
        .header p { font-size: 0.95rem; opacity: 0.85; }

        .chat-box {
          background: rgba(255,255,255,0.07);
          border-radius: 15px;
          padding: 18px;
          height: 320px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chat-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 12px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .chat-bubble.user {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          align-self: flex-end;
        }

        .chat-bubble.ai {
          background: rgba(255,255,255,0.1);
          border-left: 4px solid #60a5fa;
          align-self: flex-start;
        }

        .input-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        textarea {
          background: rgba(255,255,255,0.08);
          border: none;
          border-radius: 10px;
          padding: 10px 12px;
          color: white;
          font-size: 0.95rem;
          resize: none;
          width: 100%;
          height: 60px;
        }

        textarea:focus {
          outline: 2px solid #60a5fa;
        }

        button {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .show-more-btn {
          margin-top: 10px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          border-radius: 20px;
          padding: 6px 14px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .upload-section h3 { margin-bottom: 10px; text-align: center; }
        .file-upload-grid {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .file-card {
          background: rgba(255,255,255,0.08);
          border: 1px dashed rgba(255,255,255,0.3);
          border-radius: 10px;
          padding: 20px;
          width: 45%;
          text-align: center;
          transition: all 0.3s ease;
        }

        .file-card:hover { background: rgba(255,255,255,0.15); }

        input[type="file"] { margin-top: 8px; color: white; }

        .analyze-btn {
          margin: 20px auto 0;
          display: block;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}

export default AISuggestions;
