import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import dashboardBg from "../assets/dashboardbg.jpg";

function Dashboard() {
  const navigate = useNavigate();

  // ✅ Random & Animated Stats
  const [stats, setStats] = useState({
    totalResumes: 5,
    totalSuggestions: 6,
    completedProfiles: 8,
  });
  const [animatedStats, setAnimatedStats] = useState({
    totalResumes: 0,
    totalSuggestions: 0,
    completedProfiles: 0,
  });

  // ✅ Randomize slightly on refresh
  useEffect(() => {
    const randomOffset = () => Math.floor(Math.random() * 5) - 2; // -2 to +2 variation
    setStats({
      totalResumes: 5 + randomOffset(),
      totalSuggestions: 6 + randomOffset(),
      completedProfiles: 8 + randomOffset(),
    });
  }, []);

  // ✅ Animate numbers counting up
  useEffect(() => {
    let frame;
    const duration = 1500;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setAnimatedStats({
        totalResumes: Math.floor(progress * stats.totalResumes),
        totalSuggestions: Math.floor(progress * stats.totalSuggestions),
        completedProfiles: Math.floor(progress * stats.completedProfiles),
      });
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [stats]);

  // ✅ Slogans (same as before)
  const slogans = [
    "Empowering your career journey with AI.",
    "Create. Improve. Shine with CareerGen AI.",
    "Your resume, smarter than ever before.",
    "AI-powered insights for dream jobs.",
    "Turn your skills into opportunities.",
    "CareerGen — Where talent meets intelligence.",
  ];
  const [currentSlogan, setCurrentSlogan] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Navigation handlers
  const goToBuildResume = () => navigate("/resume-build");
  const goToViewResumes = () => navigate("/view-resumes");
  const goToAISuggestions = () => navigate("/ai-suggestions");
  const goToResumeAnalysis = () => navigate("/job-selection");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Resume showcase (unchanged)
  const showcase = [
    {
      title: "Software Engineer Resume",
      desc: "A clean, modern layout highlighting technical skills and project experience.",
      img: "https://cdn.dribbble.com/users/146798/screenshots/17232858/media/15b3b7e4e3eaad1aefcc93e49c07d39c.png",
    },
    {
      title: "Data Analyst Resume",
      desc: "Visual and metrics-driven design to emphasize analytical and problem-solving skills.",
      img: "https://cdn.dribbble.com/userupload/5934645/file/original-7edca2bdeff45774e5b1269e8a2e7e4e.png",
    },
    {
      title: "Marketing Executive Resume",
      desc: "Creative layout showcasing branding, campaigns, and communication expertise.",
      img: "https://cdn.dribbble.com/userupload/14239748/file/original-2bbdc129e328a21e534d70c470b2f0aa.png?resize=1200x900",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="overlay"></div>

      {/* Sidebar (same UI) */}
      <motion.div
        className="sidebar"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>CareerGen AI</h2>
        <nav>
          <ul>
            <li>🏠 Dashboard</li>
            <li onClick={goToBuildResume}>📝 Build Resume</li>
            <li onClick={goToViewResumes}>📂 View My Resumes</li>
            <li onClick={goToAISuggestions}>🤖 AI Suggestions</li>
            <li onClick={goToResumeAnalysis}>📊 Resume Job Analysis</li>
            <li onClick={handleLogout}>🚪 Logout</li>
          </ul>
        </nav>
      </motion.div>

      {/* Main Content (same UI) */}
      <motion.div
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <div className="navbar">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="gradient-title"
          >
            Make Your Career Better with CareerGen AI 🚀
          </motion.h1>
        </div>

        {/* Rotating Slogans */}
        <div className="slogan-section">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlogan}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="slogan-text"
            >
              {slogans[currentSlogan]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <motion.button whileHover={{ scale: 1.05 }} onClick={goToBuildResume}>
            🧾 Create Resume
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} onClick={goToViewResumes}>
            📂 View My Resumes
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} onClick={goToAISuggestions}>
            🤖 Ask AI Suggestions
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} onClick={goToResumeAnalysis}>
            📊 Resume Job Analysis
          </motion.button>
        </div>

        {/* ✅ Stats (same UI — animated numbers only) */}
        <div className="stats-cards">
          <motion.div
            className="stat-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h4>Resumes Created</h4>
            <p className="stat-number">{animatedStats.totalResumes}+</p>
          </motion.div>

          <motion.div
            className="stat-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4>AI Suggestions Used</h4>
            <p className="stat-number">{animatedStats.totalSuggestions}+</p>
          </motion.div>

          <motion.div
            className="stat-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h4>Completed Profiles</h4>
            <p className="stat-number">{animatedStats.completedProfiles}+</p>
          </motion.div>
        </div>

        {/* Resume Showcase (unchanged) */}
        <div className="showcase-section">
          <h2>🌟 Explore Top Resume Formats & Job Roles</h2>
          {showcase.map((item, index) => (
            <motion.div
              key={index}
              className={`showcase-item ${index % 2 === 0 ? "normal" : "reverse"}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src={item.img} alt={item.title} />
              <div className="showcase-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Your Original CSS — unchanged */}
      <style>{`
        .dashboard-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          background: url(${dashboardBg}) no-repeat center center/cover;
          font-family: 'Poppins', sans-serif;
        }
        .overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(0,0,50,0.7), rgba(0,0,0,0.7));
          backdrop-filter: blur(6px);
          z-index: 1;
        }
        .sidebar {
          z-index: 2;
          width: 240px;
          min-height: 100vh;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          color: #fff;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .sidebar h2 {
          text-align: center;
          font-size: 1.6rem;
          margin-bottom: 30px;
          color: #60a5fa;
        }
        .sidebar li {
          margin: 18px 0;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s;
          padding: 10px;
          border-radius: 8px;
        }
        .sidebar li:hover {
          background: rgba(59,130,246,0.3);
          transform: translateX(5px);
        }
        .main-content {
          z-index: 2;
          flex: 1;
          padding: 50px;
          color: white;
        }
        .gradient-title {
          font-size: 2.3rem;
          font-weight: 700;
          background: linear-gradient(90deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
        }
        .slogan-section {
          text-align: center;
          margin: 25px 0 40px;
        }
        .slogan-text {
          font-size: 1.25rem;
          font-style: italic;
          color: #cbd5e1;
        }
        .quick-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 40px;
        }
        .quick-actions button {
          padding: 15px 25px;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: 0.3s;
        }
        .quick-actions button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 18px rgba(0,0,0,0.3);
        }
        .stats-cards {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 60px;
        }
        .glass-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.1);
          flex: 1;
          min-width: 220px;
          border-radius: 20px;
          padding: 35px;
          text-align: center;
          transition: 0.4s;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }
        .glass-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.18);
        }
        .glass-card h4 {
          color: #93c5fd;
          font-size: 1.1rem;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .stat-number {
          font-size: 2.8rem;
          font-weight: 800;
          color: #ffffff;
          text-shadow: 0 0 15px rgba(96,165,250,0.6);
        }
        .showcase-section {
          margin-top: 60px;
        }
        .showcase-section h2 {
          text-align: center;
          color: #fff;
          margin-bottom: 40px;
          font-size: 1.8rem;
        }
        .showcase-item {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 70px;
          flex-wrap: wrap;
        }
        .showcase-item.reverse {
          flex-direction: row-reverse;
        }
        .showcase-item img {
          width: 45%;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
          transition: transform 0.3s;
        }
        .showcase-item img:hover {
          transform: scale(1.03);
        }
        .showcase-text h3 {
          color: #60a5fa;
          font-size: 1.6rem;
          margin-bottom: 10px;
        }
        .showcase-text p {
          color: #d1d5db;
          font-size: 1.05rem;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .showcase-item {
            flex-direction: column !important;
          }
          .showcase-item img {
            width: 100%;
          }
          .main-content {
            padding: 25px;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
