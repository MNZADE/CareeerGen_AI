import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumeTemplateProfessional({ resumeData }) {
  const resumeRef = useRef();

  // ✅ PDF Download
  const downloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.name || "Professional_Resume"}.pdf`);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#e5e7eb",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        ref={resumeRef}
        style={{
          width: "210mm",
          minHeight: "297mm",
          background: "#f9fafb",
          color: "#111827",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "#1e40af",
            color: "#fff",
            padding: "25px 35px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "700" }}>
            {resumeData.name || "Your Name"}
          </h1>
          <p style={{ margin: 0, fontSize: "13px" }}>
            {resumeData.email || "your.email@example.com"} |{" "}
            {resumeData.phone || "123-456-7890"}
          </p>
        </div>

        {/* BODY */}
        <div style={{ padding: "30px 35px" }}>
          <Section title="Skills">
            {resumeData.skills ||
              "JavaScript, React, Node.js, Team Leadership, Problem Solving"}
          </Section>

          <Section title="Work Experience">
            {resumeData.experience ||
              "Frontend Developer — TechNova (2023–Present)\nBuilt and optimized UI components for high-performance web apps."}
          </Section>

          {/* 🎓 EDUCATION SECTION */}
          <Section title="Education Details">
            {resumeData.education && resumeData.education.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {resumeData.education.map((edu, index) => (
                  <li key={index}>
                    <strong>{edu.level}</strong> — {edu.institution} (
                    {edu.year}) | {edu.score}
                  </li>
                ))}
              </ul>
            ) : (
              "B.Tech in Computer Science — XYZ University (2024)"
            )}
          </Section>

          {/* 🧩 PROJECTS */}
          <Section title="Projects">
            {resumeData.projects ||
              "AI Resume Builder — Developed an AI-driven system that creates professional resumes dynamically."}
          </Section>

          {/* 🏆 ACHIEVEMENTS */}
          <Section title="Achievements / Certifications">
            {resumeData.achievements ||
              "AWS Certified Developer | Best Project Award 2023 | Hackathon Winner"}
          </Section>

          {/* 🔗 LINKS */}
          <Section title="Links">
            {resumeData.links ||
              "LinkedIn: linkedin.com/in/username | GitHub: github.com/username"}
          </Section>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "25px",
          background: "linear-gradient(90deg, #1e40af, #3b82f6)",
          border: "none",
          color: "#fff",
          padding: "12px 25px",
          borderRadius: "10px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        📄 Download PDF
      </button>
    </div>
  );
}

// ✅ Reusable Section Component
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "20px" }}>
    <h3
      style={{
        color: "#1e40af",
        fontSize: "1.1rem",
        fontWeight: "600",
        borderBottom: "1px solid #cbd5e1",
        paddingBottom: "5px",
        marginBottom: "6px",
        textTransform: "uppercase",
      }}
    >
      {title}
    </h3>
    <p
      style={{
        color: "#333",
        lineHeight: "1.6",
        fontSize: "13px",
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </p>
  </div>
);

export default ResumeTemplateProfessional;
