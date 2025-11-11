import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeBuilderAI from "./pages/resumebuild"; // Make sure your file is named resumebuild.js
import Dashboard from "./pages/Dashboard"; // Add your new Dashboard page
import ViewResumes from "./pages/ViewResumes";
import AISuggestions from "./pages/AISuggestions";
import JobSelection from "./pages/JobSelection";
import ResumeAnalysis from "./pages/ResumeAnalysis";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume-build" element={<ResumeBuilderAI />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
         <Route path="/view-resumes" element={<ViewResumes />} />
         <Route path="/ai-suggestions" element={<AISuggestions />} />
           <Route path="/job-selection" element={<JobSelection />} />
<Route path="/resume-analysis" element={<ResumeAnalysis />} />        

          
        
      </Routes>
    </Router>
  );
}

export default App;
