import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeTemplateMinimalist = ({ resumeData }) => {
  const resumeRef = useRef();

  // ✅ Export as PDF
  const downloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.name || "My_Resume"}.pdf`);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#e5e7eb",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      {/* PDF Container */}
      <div
        ref={resumeRef}
        style={{
          width: "210mm",
          minHeight: "297mm",
          background: "#fff",
          color: "#111827",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          padding: "25mm",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            borderBottom: "2px solid #d1d5db",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ fontSize: "28px", color: "#111827", margin: "0" }}>
            {resumeData.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            {resumeData.email || "your.email@example.com"} |{" "}
            {resumeData.phone || "123-456-7890"}
          </p>
        </div>

        {/* SUMMARY */}
        <Section title="Profile Summary">
          Motivated professional seeking to leverage skills in a dynamic
          organization to contribute to innovative solutions.
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          {resumeData.skills
            ? resumeData.skills
            : "React, Node.js, Python, Communication, Problem Solving"}
        </Section>

        {/* EXPERIENCE */}
        <Section title="Work Experience">
          {resumeData.experience
            ? resumeData.experience
            : "Software Engineer — ABC Corp (2022–Present)\nDeveloped scalable web apps and automated workflows."}
        </Section>

        {/* EDUCATION */}
        <Section title="Education Details">
          {resumeData.education && resumeData.education.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {resumeData.education.map((edu, index) => (
                <li key={index} style={{ marginBottom: "5px" }}>
                  <strong>{edu.level}</strong> — {edu.institution} (
                  {edu.year}) | {edu.score}
                </li>
              ))}
            </ul>
          ) : (
            "B.Tech in Computer Science — XYZ University, 2024"
          )}
        </Section>

        {/* PROJECTS */}
        <Section title="Projects">
          {resumeData.projects ||
            "AI Resume Builder — Developed an AI-driven system that creates professional resumes dynamically."}
        </Section>

        {/* ACHIEVEMENTS */}
        <Section title="Achievements / Certifications">
          {resumeData.achievements ||
            "AWS Certified Developer | Best Project Award 2023 | Hackathon Winner"}
        </Section>

        {/* LINKS */}
        <Section title="Links">
          {resumeData.links ||
            "LinkedIn: linkedin.com/in/username | GitHub: github.com/username"}
        </Section>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "30px",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
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
};

// ✅ Reusable Section Component
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "18px" }}>
    <h3
      style={{
        fontSize: "16px",
        color: "#1f2937",
        marginBottom: "5px",
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: "3px",
        textTransform: "uppercase",
      }}
    >
      {title}
    </h3>
    <p
      style={{
        fontSize: "13px",
        color: "#374151",
        whiteSpace: "pre-line",
        margin: 0,
      }}
    >
      {children}
    </p>
  </div>
);

export default ResumeTemplateMinimalist;
