import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import registerBg from "../assets/registerbg.webp"; // Import local image

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIXED: Correct backend route
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registration successful!");
        setShowPopup(true);
      } else {
        alert(`⚠️ ${data.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="overlay"></div>
      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Join CareerGen AI</h2>
        <p className="subtitle">
          Create your account to start building AI-powered resumes
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="login-message">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Registration Successful!</h3>
            <p>You can now login with your credentials.</p>
            <button onClick={handlePopupClose}>Go to Login</button>
          </div>
        </div>
      )}

      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          height: 100%;
        }

        .register-page {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url(${registerBg}) no-repeat center center/cover;
        }

        .overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          z-index: 1;
        }

        .register-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 450px;
          padding: 50px 30px;
          border-radius: 20px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .register-card h2 {
          color: #fff;
          font-size: 2rem;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .register-card .subtitle {
          color: #d1d5db;
          margin-bottom: 30px;
          font-size: 1rem;
        }

        .input-group {
          width: 100%;
          margin-bottom: 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          margin-bottom: 6px;
          color: #d1d5db;
          font-weight: 500;
        }

        .input-group input {
          width: 100%;
          padding: 14px 12px;
          border-radius: 12px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.15);
          color: #fff;
          font-size: 1rem;
          transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
        }

        .input-group input:focus {
          background: rgba(255,255,255,0.25);
          transform: scale(1.02);
          box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }

        button {
          width: 100%;
          padding: 14px;
          margin-top: 10px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s;
        }

        button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          background: linear-gradient(90deg, #8b5cf6, #3b82f6);
        }

        .login-message {
          margin-top: 20px;
          color: #d1d5db;
          font-size: 0.95rem;
        }

        .login-message a {
          color: #60a5fa;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s;
        }

        .login-message a:hover {
          color: #3b82f6;
        }

        .popup {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .popup-content {
          background: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          max-width: 400px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        @media (max-width: 480px) {
          .register-card {
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;
