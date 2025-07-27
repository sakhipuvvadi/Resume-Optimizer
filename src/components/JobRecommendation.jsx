import { useState } from "react";
import { getJobRecommendations, uploadResume } from "../api/api";

const JobRecommendation = () => {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState("");
  const [jobResults, setJobResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setJobResults([]);

    try {
      let result;

      if (file) {
        const formData = new FormData();
        formData.append("resume", file);
        result = await uploadResume(formData);
        setExtractedSkills(result.skills || "");
      } else if (skills.trim()) {
        result = await getJobRecommendations(skills);
        setExtractedSkills(skills);
      }

      if (result) {
        const jobs = result.job_titles.map((title, index) => ({
          title,
          description: result.job_descriptions[index],
        }));
        setJobResults(jobs);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Job Recommendation</h2>

      {/* Drag & Drop Area */}
      <div
        className="border-2 border-dotted border-gray-400 rounded-lg p-6 text-center bg-gray-50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {file ? (
          <p className="text-gray-600">{file.name}</p>
        ) : (
          <>
            <p className="text-gray-500">Choose a Resume or Drag Here</p>
            <label className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              Browse Files
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </>
        )}
      </div>

      {/* Skills Input */}
      <p className="text-gray-500 mt-4 text-sm text-center">Or Enter Skills Manually</p>
      <textarea
        className="w-full border border-gray-300 rounded p-2 mt-2"
        placeholder="e.g., Python, Data Science, React"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
      >
        {loading ? "Loading..." : "Get Job Recommendations"}
      </button>

      {/* Extracted Skills Info */}
      {extractedSkills && (
        <div className="mt-4 text-gray-600 text-sm">
          <strong>Skills Used:</strong> {extractedSkills}
        </div>
      )}

      {/* Job Results */}
      {jobResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Recommended Jobs</h3>
          {jobResults.map((job, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded shadow-sm">
              <h4 className="font-bold">{job.title}</h4>
              <p className="text-sm">{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobRecommendation;
