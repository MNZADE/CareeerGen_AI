import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumeTemplateCreative({ resumeData }) {
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
    pdf.save(`${resumeData.name || "Creative_Resume"}.pdf`);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f3f4f6, #fff)",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      {/* Resume A4 Layout */}
      <div
        ref={resumeRef}
        style={{
          width: "210mm",
          minHeight: "297mm",
          background: "#ffffff",
          padding: "25mm 20mm",
          boxShadow: "0 0 15px rgba(0,0,0,0.15)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1
            style={{
              fontSize: "2.2rem",
              color: "#3b82f6",
              marginBottom: "5px",
              fontWeight: "700",
            }}
          >
            {resumeData.name || "Your Name"}
          </h1>
          <p style={{ color: "#555", fontSize: "0.95rem" }}>
            {resumeData.email || "your.email@example.com"} |{" "}
            {resumeData.phone || "123-456-7890"}
          </p>
        </div>

        {/* SKILLS */}
        <Section title="Skills">
          {resumeData.skills ? (
            <ul style={listStyle}>
              {resumeData.skills.split(",").map((skill, index) => (
                <li key={index}>{skill.trim()}</li>
              ))}
            </ul>
          ) : (
            <ul style={listStyle}>
              <li>UI Design</li>
              <li>React</li>
              <li>Creativity</li>
              <li>Team Collaboration</li>
            </ul>
          )}
        </Section>

        {/* EXPERIENCE */}
        <Section title="Work Experience">
          {resumeData.experience ||
            "UI/UX Designer — Developed user-friendly interfaces for mobile and web applications."}
        </Section>

        {/* EDUCATION */}
        <Section title="Education Details">
          {resumeData.education && resumeData.education.length > 0 ? (
            <ul style={listStyle}>
              {resumeData.education.map((edu, i) => (
                <li key={i}>
                  <strong>{edu.level}</strong> — {edu.institution} (
                  {edu.year}) | {edu.score}
                </li>
              ))}
            </ul>
          ) : (
            "Bachelor of Design — ABC Institute of Technology, 2024"
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

      {/* Download PDF Button */}
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "30px",
          background: "linear-gradient(90deg, #3b82f6, #9333ea)",
          border: "none",
          color: "#fff",
          padding: "12px 25px",
          borderRadius: "10px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          transition: "0.3s",
        }}
      >
        📄 Download PDF
      </button>
    </div>
  );
}

// ✨ Section Reusable Component
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "20px" }}>
    <h2
      style={{
        fontSize: "1.3rem",
        color: "#2563eb",
        marginBottom: "8px",
        fontWeight: "600",
        borderBottom: "1px solid #dbeafe",
        paddingBottom: "4px",
      }}
    >
      {title}
    </h2>
    <p
      style={{
        color: "#374151",
        lineHeight: "1.6",
        marginBottom: "10px",
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </p>
  </div>
);

const listStyle = {
  listStyle: "circle",
  paddingLeft: "20px",
  color: "#333",
  marginBottom: "10px",
  lineHeight: "1.6",
};

export default ResumeTemplateCreative;
