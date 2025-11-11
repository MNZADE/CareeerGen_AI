import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewResumes() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  // ✅ Load & sync resumes (local + MongoDB Atlas)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || { id: "USER123" };
    const userId = user.id;

    const localData = JSON.parse(localStorage.getItem("resumes")) || [];
    setResumes(localData);

    // Fetch synced resumes from backend (MongoDB Atlas)
    const fetchResumes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/resumes/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setResumes(data);
          localStorage.setItem("resumes", JSON.stringify(data));
        }
      } catch (err) {
        console.warn("⚠️ Offline — showing local resumes", err);
      }
    };

    fetchResumes();
  }, []);

  // ✅ Edit Resume
  const handleEdit = (resume) => {
    localStorage.setItem("editResume", JSON.stringify(resume));
    navigate("/resume-build");
  };

  // ✅ Download Resume (PDF or Image)
  const handleDownload = (resume, type) => {
    const link = document.createElement("a");
    if (type === "pdf" && resume.pdfUrl) {
      link.href = resume.pdfUrl;
      link.download = `${resume.name}.pdf`;
    } else if (type === "image" && resume.imageUrl) {
      link.href = resume.imageUrl;
      link.download = `${resume.name}.jpg`;
    } else {
      return alert("⚠️ File not available yet.");
    }
    link.click();
  };

  // ✅ Delete Resume (Local + MongoDB)
  const handleDelete = async (resumeId) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this resume?")) return;

    // 1️⃣ Remove from LocalStorage
    const updatedLocal = resumes.filter((r) => r._id !== resumeId && r.id !== resumeId);
    setResumes(updatedLocal);
    localStorage.setItem("resumes", JSON.stringify(updatedLocal));

    // 2️⃣ Try removing from MongoDB Atlas
    try {
      const res = await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("✅ Resume deleted successfully!");
      } else {
        alert("⚠️ Deleted locally, but failed to remove from server.");
      }
    } catch (err) {
      console.error("❌ Error deleting from MongoDB:", err);
      alert("⚠️ Deleted locally. Server not reachable.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.3rem",
          marginBottom: "40px",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        📂 My Saved Resumes
      </h1>

      {resumes.length === 0 ? (
        <p style={{ textAlign: "center", color: "#94a3b8" }}>
          No saved resumes yet. Create one from the Resume Builder!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {resumes.map((resume, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  src={resume.imageUrl || "https://via.placeholder.com/250x180"}
                  alt="Resume Preview"
                  style={{
                    width: "100%",
                    height: "180px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginBottom: "15px",
                  }}
                />
                <h3 style={{ color: "#fff" }}>{resume.name}</h3>
                <p style={{ color: "#9ca3af" }}>{resume.template} Template</p>
                {resume.pendingSync && (
                  <p style={{ color: "#facc15", fontSize: "0.8rem" }}>
                    ⚠️ Pending sync (offline)
                  </p>
                )}
              </div>

              {/* 🔽 Action Buttons */}
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {/* Download Buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    style={actionButton}
                    onClick={() => handleDownload(resume, "pdf")}
                  >
                    📄 PDF
                  </button>
                  <button
                    style={actionButton}
                    onClick={() => handleDownload(resume, "image")}
                  >
                    🖼️ JPG
                  </button>
                </div>

                {/* Edit + Delete */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    style={{
                      ...actionButton,
                      background: "linear-gradient(90deg, #22c55e, #16a34a)",
                    }}
                    onClick={() => handleEdit(resume)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    style={{
                      ...actionButton,
                      background: "linear-gradient(90deg, #ef4444, #dc2626)",
                    }}
                    onClick={() =>
                      handleDelete(resume._id || resume.id || resume.name)
                    }
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🔧 Reusable Button Style
const actionButton = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.3s",
};

export default ViewResumes;
