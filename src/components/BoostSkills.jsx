import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // Install using `npm install papaparse`

const BoostSkills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetch("/datasets.csv")
      .then((response) => response.text())
      .then((data) => {
        const parsedData = Papa.parse(data, { header: true }).data;
        const extractedSkills = [...new Set(parsedData.map(row => row["Skills"]).filter(skill => skill))];
        setSkills(extractedSkills);
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  useEffect(() => {
    if (selectedSkill) {
      fetch("/datasets.csv")
        .then((response) => response.text())
        .then((data) => {
          const parsedData = Papa.parse(data, { header: true }).data;
          
          // Collect ALL certifications for the selected skill
          const relatedCerts = parsedData
            .filter(row => row["Skills"] === selectedSkill)
            .flatMap(row => row["Certifications"].split(","))
            .map(cert => cert.trim())
            .filter(cert => cert);
          
          setCertifications(relatedCerts);
        })
        .catch((error) => console.error("Error fetching certifications:", error));
    } else {
      setCertifications([]);
    }
  }, [selectedSkill]);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8 rounded-xl shadow-lg max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold text-center mb-4">🚀 Boost Your Skills</h2>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-lg">Select a Skill:</label>
        <select 
          value={selectedSkill} 
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="px-4 py-2 border-none rounded-md bg-white text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">-- Choose Skill --</option>
          {skills.map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      {selectedSkill && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">🎓 Recommended Certifications</h3>
          {certifications.length > 0 ? (
            <ul className="space-y-2">
              {certifications.map((cert, index) => (
                <li key={index} className="bg-white text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-blue-200 transition">
                  {cert}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No certifications found for <b>{selectedSkill}</b></p>
          )}
        </div>
      )}
    </div>
  );
};

export default BoostSkills;
