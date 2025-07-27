import React,{ useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";
// import ResumeTemplates from "../pages/ResumeTemplates";
import BoostSkills from "../components/BoostSkills";
import JobRecommendation from "../components/JobRecommendation.jsx";
import ATSScoreSection from "../components/ATS";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import ResumeTemplates from "../components/ResumeTemplates";






const Home = ({ user }) => {
  const atsSectionRef = useRef(null); // Reference for ATS Score section
  const boostSkillsRef = useRef(null); // Reference for BoostSkills section
  const resumeUploadRef = useRef(null); // Reference for Resume Upload section
  const navigate = useNavigate();
  const templatesRef = useRef(null);

  const scrollToTemplates = () => {
    templatesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  

  // ✅ Function to scroll to Boost Skills section
  const handleScrollToBoostSkills = () => {
    boostSkillsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToATS = () => {
    atsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  

  // ✅ Function to scroll to Resume Upload section
  const handleScrollToResumeUpload = () => {
    resumeUploadRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file.name);
      }
        
  };
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="flex justify-between p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">Career Craft</h1>
        <div className="flex items-center gap-4">
        <button className="relative text-black font-medium transition bg-transparent border-none outline-none focus:outline-none focus:ring-0 group"
        aria-label="Scroll to Best Fit section"
        onClick={scrollToTemplates}>
        Resume Templates
        <span className="absolute left-0 -bottom-1 w-full h-1 bg-blue-600 scale-x-0 transition-transform duration-300 ease-in-out group-focus:scale-x-100"></span>
        </button>
        <button className="relative text-black font-medium transition bg-transparent border-none outline-none focus:outline-none focus:ring-0 group"
        onClick={handleScrollToResumeUpload}
        aria-label="Scroll to Best Fit section">
        Best Fit
        <span className="absolute left-0 -bottom-1 w-full h-1 bg-blue-600 scale-x-0 transition-transform duration-300 ease-in-out group-focus:scale-x-100"></span>
        </button>
        <button className="relative text-black font-medium transition bg-transparent border-none outline-none focus:outline-none focus:ring-0 group"
        onClick={handleScrollToATS}>
        ATS
        <span className="absolute left-0 -bottom-1 w-full h-1 bg-blue-600 scale-x-0 transition-transform duration-300 ease-in-out group-focus:scale-x-100"></span>
        </button>
        <button className="relative text-black font-medium transition bg-transparent border-none outline-none focus:outline-none focus:ring-0 group"
        onClick={handleScrollToBoostSkills}>
        
        Boost skills
        <span className="absolute left-0 -bottom-1 w-full h-1 bg-blue-600 scale-x-0 transition-transform duration-300 ease-in-out group-focus:scale-x-100"></span>
        </button>
        {user ? (
  <div className="flex items-center gap-2">
    <span className="text-blue-600 font-semibold">Hi, {user.displayName ||user.email.split("@")[0]}</span>
    <button
      className="px-4 py-2 bg-red-600 text-white rounded-md"
      onClick={() => {
        signOut(auth)
  .then(() => console.log("Signed out"))
  .catch((error) => console.error("Sign out error:", error));

      }}
    >
      Sign Out
    </button>
  </div>
) : (
  <>
    <button
      className="border-2 border-blue-600 text-blue-600 font-bold px-4 py-2 rounded-md hover:bg-blue-100 transition"
      onClick={() => navigate("/signin")}
    >
      Sign in
    </button>
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
      onClick={() => navigate("/signup")}
    >
      Get Started
    </button>
  </>
)}

        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-4xl font-bold text-gray-900">
        Your career deserves more than a template
        </h2>
        <p className="text-lg text-gray-600 mt-2">
        Build, optimize, and grow with Career Craft
        </p>
      </div>
      {/* ✅ Resume Templates Section */}
      <div ref={templatesRef} style={{ marginTop: "100px", minHeight: "500px" }}>
        <ResumeTemplates />
      </div>
      {/* ✅ Resume Upload Section */}
      <div ref={resumeUploadRef} style={{ marginTop: "200px", minHeight: "500px" }}>
        <JobRecommendation />
      </div>
      
      <div ref={atsSectionRef} style={{ marginTop: "200px", minHeight: "500px" }}>
        <ATSScoreSection />
      </div>

      <div ref={boostSkillsRef} style={{ marginTop: "200px",minHeight: "500px" }}>
      <BoostSkills />
      </div>


      {/* Footer */}
      <footer className="footer">
        © 2025 Career Craft. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
