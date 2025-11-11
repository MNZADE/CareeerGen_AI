import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { Upload, Sparkles, ClipboardCheck, Briefcase, Lightbulb } from "lucide-react";

function ResumeAnalysis() {
  const location = useLocation();
  const preselectedRole = location.state?.jobRole || "";
  const [resumeFile, setResumeFile] = useState(null);
  const [jobRole, setJobRole] = useState(preselectedRole);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [suggestion, setSuggestion] = useState(
    "💡 Your resume looks strong! Try adding measurable achievements, tools, or specific keywords from the job role."
  );

  const atsScoreAnim = useAnimation();
  const jobMatchAnim = useAnimation();

  // 📡 Upload and Analyze Resume (connected to backend)
  const handleAnalyzeResume = async () => {
    if (!resumeFile || !jobRole) {
      return alert("Please select a job role and upload a resume.");
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobRole", jobRole);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await fetch("http://localhost:5000/api/ai/analyze-job-match", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Server error during analysis");
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      console.error("❌ Error analyzing resume:", error);
      alert("Something went wrong. Please check your backend connection.");
    }

    setLoading(false);
  };

  // 🎯 Animate ATS & Job Match Bars When Data Arrives
  useEffect(() => {
    if (analysis) {
      atsScoreAnim.start({
        strokeDashoffset: 440 - (440 * (analysis.atsScoreValue || 82)) / 100,
        transition: { duration: 1.4, ease: "easeInOut" },
      });
      jobMatchAnim.start({
        width: `${analysis.jobMatchScore || 75}%`,
        transition: { duration: 1.2, ease: "easeInOut" },
      });
    }
  }, [analysis]);

  return (
    <div className="page-container">
      <motion.div
        className="analysis-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="header">
          <ClipboardCheck size={36} className="icon" />
          <h2>Resume Job Match Analysis</h2>
          <p>
            Upload your resume and discover how well it aligns with your target
            job role 🎯
          </p>
        </div>

        {/* Job Role Selection */}
        <div className="input-group">
          <label>
            <Briefcase size={18} className="label-icon" /> Select Job Role
          </label>
          <select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          >
            <option value="">-- Choose a Job Role --</option>
            {[
              "Software Engineer",
              "Data Analyst",
              "Web Developer",
              "UI/UX Designer",
              "Project Manager",
              "Digital Marketer",
              "Business Analyst",
              "Machine Learning Engineer",
              "Network Administrator",
              "HR Executive",
            ].map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Resume Upload */}
        <div className="input-group">
          <div className="upload-box">
            <Upload size={24} className="upload-icon" />
            <p>Upload Resume (PDF/DOCX)</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
          </div>

          <textarea
            placeholder="(Optional) Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {/* Analyze Button */}
        <motion.button
          className="analyze-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAnalyzeResume}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"} <Sparkles size={18} />
        </motion.button>

        {/* Results Section */}
        {analysis && (
          <motion.div
            className="result-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3>AI Analysis Results</h3>

            {/* ATS Match Score */}
            <div className="score-circle">
              <svg className="progress-ring" width="160" height="160">
                <circle
                  className="progress-ring__circle-bg"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                />
                <motion.circle
                  className="progress-ring__circle"
                  stroke="#22c55e"
                  strokeWidth="10"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                  strokeDasharray="440"
                  strokeDashoffset="440"
                  strokeLinecap="round"
                  animate={atsScoreAnim}
                />
              </svg>
              <div className="score-text">
                {analysis.atsScoreValue || 82}%
                <span>{analysis.atsLabel || "ATS Match"}</span>
              </div>
            </div>

            {/* Job Match Bar */}
            <div className="job-match">
              <h4>Job & Resume Match</h4>
              <div className="bar-container">
                <motion.div className="bar-fill" animate={jobMatchAnim}></motion.div>
              </div>
              <p>
                {analysis.jobMatchLabel || "Good Match"} ({analysis.jobMatchScore || 75}%)
              </p>
            </div>

            {/* AI Suggestions */}
            <div className="suggestion-box">
              <h4>
                <Lightbulb size={18} color="#facc15" /> AI Suggestions
              </h4>
              <textarea
                value={
                  analysis.suggestions
                    ? analysis.suggestions.join("\n")
                    : suggestion
                }
                readOnly
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ✅ Unified Styling */}
      <style>{`
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          font-family: 'Poppins', sans-serif;
        }

        .analysis-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          padding: 40px;
          width: 850px;
          max-width: 95%;
        }

        .header {
          text-align: center;
          margin-bottom: 25px;
        }

        .header h2 {
          color: #1e293b;
          font-size: 1.7rem;
          margin-bottom: 5px;
        }

        .header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .icon {
          color: #3b82f6;
          margin-bottom: 10px;
        }

        label {
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          width: 100%;
          font-size: 1rem;
          color: #1e293b;
          background: #f8fafc;
        }

        select:focus {
          border-color: #3b82f6;
          outline: none;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .upload-box {
          border: 2px dashed #cbd5e1;
          border-radius: 10px;
          text-align: center;
          padding: 20px;
          margin-bottom: 15px;
          background: #f9fafb;
          transition: all 0.3s;
        }

        .upload-box:hover {
          border-color: #3b82f6;
          background: #e0f2fe;
        }

        .upload-icon {
          color: #3b82f6;
          margin-bottom: 8px;
        }

        textarea {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: #f9fafb;
          padding: 12px;
          font-size: 0.95rem;
          color: #1e293b;
          resize: none;
        }

        .analyze-btn {
          width: 100%;
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 14px 25px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
          cursor: pointer;
        }

        .result-section {
          margin-top: 30px;
          background: #f8fafc;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .score-circle {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 25px auto;
        }

        .progress-ring__circle-bg, .progress-ring__circle {
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }

        .score-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          font-size: 1.6rem;
          font-weight: 700;
          color: #22c55e;
        }

        .score-text span {
          display: block;
          font-size: 0.9rem;
          color: #64748b;
        }

        .job-match {
          text-align: center;
          margin-top: 25px;
        }

        .bar-container {
          background: #e2e8f0;
          height: 15px;
          border-radius: 10px;
          overflow: hidden;
          width: 80%;
          margin: 10px auto;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #16a34a);
        }

        .suggestion-box {
          margin-top: 25px;
        }

        .suggestion-box h4 {
          color: #facc15;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .suggestion-box textarea {
          background: #f9fafb;
          border: 1px solid #cbd5e1;
          color: #1e293b;
          border-radius: 10px;
          padding: 10px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default ResumeAnalysis;
