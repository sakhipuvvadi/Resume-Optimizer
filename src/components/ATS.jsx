import React, { useRef, useState, useEffect } from "react";
import Papa from "papaparse";

const ATSScoreSection = () => {
  const fileInputRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [jobTitles, setJobTitles] = useState([]);
  const [atsScore, setAtsScore] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [matchingSkills, setMatchingSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [spellingMistakes, setSpellingMistakes] = useState(0);
  const [certificationsFound, setCertificationsFound] = useState([]);
  const [certificationsMissing, setCertificationsMissing] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetch("/jobs_datset.csv")
      .then((res) => res.text())
      .then((data) => {
        const parsed = Papa.parse(data, { header: true }).data;
        const titles = [...new Set(parsed.map(row => row["Job Title"]).filter(Boolean))];
        setJobTitles(titles);
      })
      .catch((err) => console.error("CSV load error:", err));
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const handleGetAtsScore = async () => {
    if (!resumeFile || !selectedJob) {
      alert("Please upload resume and select a job title.");
      return;
    }
    setLoading(true); // start spinner
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobTitle", selectedJob);
  
    try {
      const res = await fetch("http://localhost:5000/api/ats", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();  // Get the JSON first
      console.log("🔍 ATS Response:", data);
  
      // If the backend includes an error key, throw it
      if (data.error) {
        throw new Error(data.error);
      }
  
      setAtsScore(data.ats_score);
      setResumeText(data.resume_text);
      setMatchingSkills(data.matching_skills || []);
      setMissingSkills(data.missing_skills || []);
      setSpellingMistakes(data.spelling_mistakes || 0);
      setCertificationsFound(data.certifications_found || []);
      setCertificationsMissing(data.certifications_missing || []);
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.error("❌ ATS error:", err);
      alert("Something went wrong during analysis: " + err.message);
    }
    finally{
      setLoading(false); // stop spinner
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Upload Resume to Get ATS Score</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Breakdown */}
        <div className="md:w-1/2 border p-6 rounded-lg bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 shadow-md">
          <h3 className="text-xl font-bold mb-4 text-indigo-700">🎯 How Your ATS Score is Calculated</h3>
          <ul className="text-gray-800 space-y-2">
            <li><span className="font-semibold text-blue-700">🧠 Matching Skills (40%)</span></li>
            <li><span className="font-semibold text-red-600">📝 Spelling & Grammar (15%)</span></li>
            <li><span className="font-semibold text-green-700">🏅 Certifications (20%)</span></li>
            <li><span className="font-semibold text-yellow-600">📐 Resume Structure (10%)</span></li>
            <li><span className="font-semibold text-purple-700">💡 Optimization Suggestions (15%)</span></li>
          </ul>
        </div>

        {/* Right: Upload Section */}
        <div className="md:w-1/2 border p-4 rounded bg-gray-50">
          <label className="block mb-2 font-medium">Select Job Title:</label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          >
            <option value="">-- Select Job --</option>
            {jobTitles.map((job, index) => (
              <option key={index} value={job}>{job}</option>
            ))}
          </select>

          <label className="block mb-2 font-medium">Upload Resume:</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:border-blue-400 h-52 flex flex-col justify-center items-center"
          >
            {resumeFileName ? (
              <div className="text-gray-800">{resumeFileName}</div>
            ) : (
              <>
                <p className="text-gray-600">Click or drop your resume</p>
                <p className="text-sm text-gray-500">Accepted: .pdf, .docx, .txt</p>
              </>
            )}
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <button
            onClick={handleGetAtsScore}
            disabled={!resumeFile || !selectedJob}
            className={`mt-6 w-full py-2 px-4 rounded text-white font-semibold ${
              resumeFile && selectedJob ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            🎯 Get ATS Score
          </button>
          {loading && (
            <div className="mt-4 flex justify-center items-center">
              <svg className="animate-spin h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-blue-600 font-medium">Analyzing your resume...</span>
            </div>
          )}


          {/* Results */}
          {atsScore !== null && (
            <div className="mt-4 text-blue-600 font-bold text-xl">ATS Score: {atsScore}%</div>
          )}
          {matchingSkills.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Matching Skills:</h3>
              <ul>{matchingSkills.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
          {missingSkills.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Missing Skills:</h3>
              <ul>{missingSkills.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
          {certificationsFound.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Matching Certifications:</h3>
              <ul>{certificationsFound.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
          {certificationsMissing.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Missing Certifications:</h3>
              <ul>{certificationsMissing.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Suggestions to Improve:</h3>
              <ul className="list-disc list-inside">{suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSScoreSection;
