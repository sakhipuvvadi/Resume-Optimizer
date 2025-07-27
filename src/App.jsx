import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ResumeTemplates from './components/ResumeTemplates';
import ResumeBuilder from './components/ResumeBuilder';
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ResumeBuilderT1 from './components/ResumeBuilderT1';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for user state changes from Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up listener
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<ResumeTemplates />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-builder" element={<ResumeBuilderT1 />} />
      </Routes>
    </Router>
  );
};

export default App;
