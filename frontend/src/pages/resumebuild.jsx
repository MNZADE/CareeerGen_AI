import React, { useState } from "react";
import ResumeTemplateMinimalist from "./ResumeTemplateMinimalist";
import ResumeTemplateProfessional from "./ResumeTemplateProfessional";
import ResumeTemplateCreative from "./ResumeTemplateCreative";

function ResumeBuilderAI() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: [],
    projects: "",
    achievements: "",
    links: "",
  });

  const [educationForm, setEducationForm] = useState({
    level: "",
    institution: "",
    score: "",
    year: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  // ✅ Handle education form input
  const handleEducationChange = (e) => {
    setEducationForm({ ...educationForm, [e.target.name]: e.target.value });
  };

  // ✅ Add education entry
  const addEducation = () => {
    if (
      educationForm.level &&
      educationForm.institution &&
      educationForm.score &&
      educationForm.year
    ) {
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, educationForm],
      });
      setEducationForm({ level: "", institution: "", score: "", year: "" });
    } else {
      alert("⚠️ Please fill all education fields before adding.");
    }
  };

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    setStep(2);
  };

  // ✅ Save Resume (Local + MongoDB Atlas Sync)
  const handleGenerate = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || { id: "USER123" };
    const userId = user.id;

    const resumeToSave = {
      userId,
      name: resumeData.name || "Untitled Resume",
      template: selectedTemplate,
      data: resumeData,
      pdfUrl: "",
      imageUrl: "",
      pendingSync: false,
    };

    // ✅ Save to localStorage instantly
    const localResumes = JSON.parse(localStorage.getItem("resumes")) || [];
    const updatedLocal = [...localResumes, resumeToSave];
    localStorage.setItem("resumes", JSON.stringify(updatedLocal));
    alert("💾 Saved locally!");

    // ✅ Try syncing with MongoDB Atlas
    try {
      const res = await fetch("http://localhost:5000/api/resumes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeToSave),
      });

      if (res.ok) {
        alert("✅ Synced with MongoDB Atlas!");
      } else {
        resumeToSave.pendingSync = true;
        localStorage.setItem("resumes", JSON.stringify(updatedLocal));
        alert("⚠️ Saved locally, will sync when online!");
      }
    } catch (err) {
      console.warn("Offline or server error:", err);
      resumeToSave.pendingSync = true;
      localStorage.setItem("resumes", JSON.stringify(updatedLocal));
    }
  };

  const handleBack = () => {
    setStep(1);
    setSelectedTemplate(null);
  };

  // ✨ Step 1: Template Selection
  if (step === 1) {
    return (
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "10px",
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Choose Your Resume Template
        </h1>
        <p style={{ color: "#cbd5e1", marginBottom: "40px" }}>
          Select a professional layout to start building your AI-powered resume.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          <div
            style={templateCardStyle}
            onClick={() => selectTemplate("Minimalist")}
          >
            <p style={templateTitle}>Minimalist White & Grey</p>
            <p style={templateDesc}>Clean, professional, and modern layout.</p>
          </div>

          <div
            style={templateCardStyle}
            onClick={() => selectTemplate("Professional")}
          >
            <p style={templateTitle}>Blue Accent Professional</p>
            <p style={templateDesc}>Corporate, bold, and sectioned layout.</p>
          </div>

          <div
            style={templateCardStyle}
            onClick={() => selectTemplate("Creative")}
          >
            <p style={templateTitle}>Creative Modern</p>
            <p style={templateDesc}>Colorful, innovative design for creatives.</p>
          </div>
        </div>
      </div>
    );
  }

  // ✨ Step 2: Resume Builder Form + Preview
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(135deg, #0a0f1c, #1e293b)",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* 📝 LEFT SIDE - FORM */}
      <div
        style={{
          flex: 1,
          padding: "50px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
          overflowY: "auto",
        }}
      >
        {/* 🔙 Back + Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={handleBack}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "0.95rem",
              transition: "0.3s",
            }}
          >
            ⬅ Back
          </button>

          <h1
            style={{
              fontSize: "1.8rem",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            {selectedTemplate} Template
          </h1>
        </div>

        <p style={{ color: "#cbd5e1", marginBottom: "40px" }}>
          Fill in your details and see your resume update in real-time.
        </p>

        {/* ✅ Resume Form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={resumeData.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={resumeData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={resumeData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            value={resumeData.skills}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
          <textarea
            name="experience"
            placeholder="Work Experience"
            value={resumeData.experience}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />

          {/* 🎓 Education Section */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "15px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <h3
              onClick={() => setIsEducationOpen(!isEducationOpen)}
              style={{
                margin: 0,
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fff",
              }}
            >
              Education Details{" "}
              <span style={{ fontSize: "1.3rem" }}>
                {isEducationOpen ? "▲" : "▼"}
              </span>
            </h3>

            {isEducationOpen && (
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <select
                  name="level"
                  value={educationForm.level}
                  onChange={handleEducationChange}
                  style={{ ...inputStyle, color: "#000", background: "#fff" }}
                >
                  <option value="">Select Education Level</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="PhD">PhD</option>
                </select>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <input
                    type="text"
                    name="institution"
                    placeholder="School / College Name"
                    value={educationForm.institution}
                    onChange={handleEducationChange}
                    style={{ ...smallInputStyle, flex: "1.6" }}
                  />
                  <input
                    type="text"
                    name="score"
                    placeholder="% / CGPA"
                    value={educationForm.score}
                    onChange={handleEducationChange}
                    style={{ ...smallInputStyle, flex: "0.6" }}
                  />
                  <input
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={educationForm.year}
                    onChange={handleEducationChange}
                    style={{ ...smallInputStyle, flex: "0.6" }}
                  />
                </div>

                <button
                  type="button"
                  onClick={addEducation}
                  style={{
                    ...generateButton,
                    background: "linear-gradient(90deg, #22c55e, #16a34a)",
                    marginTop: "10px",
                  }}
                >
                  ➕ Add Education
                </button>
              </div>
            )}

            {resumeData.education.length > 0 && (
              <ul style={{ marginTop: "15px", color: "#ddd" }}>
                {resumeData.education.map((edu, index) => (
                  <li key={index}>
                    {edu.level} — {edu.institution} ({edu.year}) | {edu.score}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 📁 Other Sections */}
          <textarea
            name="projects"
            placeholder="Projects (e.g. AI Resume Builder — Developed an AI-driven system...)"
            value={resumeData.projects}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
          <textarea
            name="achievements"
            placeholder="Achievements / Certifications"
            value={resumeData.achievements}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
          <input
            type="text"
            name="links"
            placeholder="Links (LinkedIn, GitHub, Portfolio)"
            value={resumeData.links}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="button" onClick={handleGenerate} style={generateButton}>
            💾 Save & Sync Resume
          </button>
        </form>
      </div>

      {/* 📄 RIGHT SIDE - PREVIEW */}
      <div
        style={{
          flex: 1,
          padding: "40px",
          background: "#fff",
          color: "#111827",
          borderTopLeftRadius: "30px",
          borderBottomLeftRadius: "30px",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#1e3a8a",
            marginBottom: "20px",
          }}
        >
          Resume Preview ({selectedTemplate} Template)
        </h2>

        {selectedTemplate === "Minimalist" && (
          <ResumeTemplateMinimalist resumeData={resumeData} />
        )}
        {selectedTemplate === "Professional" && (
          <ResumeTemplateProfessional resumeData={resumeData} />
        )}
        {selectedTemplate === "Creative" && (
          <ResumeTemplateCreative resumeData={resumeData} />
        )}
      </div>
    </div>
  );
}

// ✨ Styles
const inputStyle = {
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
  transition: "0.3s",
  width: "100%",
};

const smallInputStyle = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: "0.9rem",
  outline: "none",
  transition: "0.3s",
};

const generateButton = {
  padding: "14px 20px",
  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.3s",
};

const templateCardStyle = {
  width: "260px",
  height: "360px",
  background: "#fff",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  color: "#111827",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const templateTitle = {
  fontWeight: "600",
  color: "#111827",
  fontSize: "1.2rem",
  marginBottom: "10px",
};

const templateDesc = {
  color: "#555",
  fontSize: "0.9rem",
};

export default ResumeBuilderAI;
