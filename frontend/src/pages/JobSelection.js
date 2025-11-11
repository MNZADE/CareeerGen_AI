import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dashboardBg from "../assets/dashboardbg.jpg";

const jobRoles = [
  {
    title: "Software Engineer",
    desc: "Design, develop, and maintain software applications.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    title: "Data Analyst",
    desc: "Interpret data, identify trends, and support business decisions.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
  },
  {
    title: "UI/UX Designer",
    desc: "Create engaging, user-friendly interfaces and experiences.",
    image: "https://images.unsplash.com/photo-1612831455543-99a80b9b3b8b",
  },
  {
    title: "Digital Marketer",
    desc: "Plan and execute online marketing strategies and campaigns.",
    image: "https://images.unsplash.com/photo-1581091012184-7d83a30e9c5f",
  },
  {
    title: "Project Manager",
    desc: "Lead teams, oversee project goals, and ensure timely delivery.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "Machine Learning Engineer",
    desc: "Build AI/ML models to solve complex data problems.",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
  },
  {
    title: "Business Analyst",
    desc: "Bridge the gap between business needs and technical solutions.",
    image: "https://images.unsplash.com/photo-1521790367269-5a46c54db05a",
  },
  {
    title: "Web Developer",
    desc: "Build responsive and dynamic web applications.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "Cybersecurity Specialist",
    desc: "Protect systems and data from cyber threats and breaches.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981d",
  },
];

function JobSelection() {
  const navigate = useNavigate();

  const handleSelectJob = (jobTitle) => {
    // ✅ Navigate to ResumeAnalysis page and pass job title in state
    navigate("/resume-analysis", { state: { jobRole: jobTitle } });
  };

  return (
    <div className="job-selection-page">
      <div className="overlay"></div>

      <motion.div
        className="job-selection-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="title">💼 Select Your Target Job Role</h2>
        <p className="subtitle">
          Choose your desired career role. Our AI will analyze how well your resume matches!
        </p>

        <div className="job-grid">
          {jobRoles.map((job, i) => (
            <motion.div
              key={i}
              className="job-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={job.image} alt={job.title} className="job-image" />
              <h3>{job.title}</h3>
              <p>{job.desc}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="select-btn"
                onClick={() => handleSelectJob(job.title)}
              >
                Analyze My Resume
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .job-selection-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: url(${dashboardBg}) no-repeat center center/cover;
          color: white;
          font-family: 'Poppins', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
        }
        .overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          z-index: 1;
        }
        .job-selection-container {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1200px;
        }
        .title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #cbd5e1;
          margin-bottom: 40px;
        }
        .job-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }
        .job-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .job-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 15px;
        }
        .job-card h3 {
          color: #60a5fa;
          font-size: 1.1rem;
          margin-bottom: 10px;
        }
        .job-card p {
          color: #d1d5db;
          font-size: 0.9rem;
          min-height: 50px;
        }
        .select-btn {
          margin-top: 10px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default JobSelection;
