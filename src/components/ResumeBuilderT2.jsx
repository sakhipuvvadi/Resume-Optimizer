import React, { useState } from "react";

const ResumeBuilderTim = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    profile: "",
    experiences: [],
    education: "",
    skills: "",
    references: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { role: "", company: "", location: "", dates: "", duties: "" },
      ],
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experiences];
    updated[index][field] = value;
    setFormData({ ...formData, experiences: updated });
  };

  const steps = [
    {
      title: "Basic Info",
      content: (
        <>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
          <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        </>
      ),
    },
    {
      title: "Profile",
      content: (
        <textarea name="profile" placeholder="Professional Profile" onChange={handleChange} />
      ),
    },
    {
      title: "Experience",
      content: (
        <>
          {formData.experiences.map((exp, index) => (
            <div key={index} className="space-y-1 border-b pb-2 mb-2">
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={exp.location}
                onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
              />
              <input
                type="text"
                placeholder="Dates (e.g., Jan 2020 - Present)"
                value={exp.dates}
                onChange={(e) => handleExperienceChange(index, "dates", e.target.value)}
              />
              <textarea
                placeholder="Duties and Responsibilities"
                value={exp.duties}
                onChange={(e) => handleExperienceChange(index, "duties", e.target.value)}
              />
            </div>
          ))}
          <button onClick={addExperience} className="text-blue-600">+ Add Experience</button>
        </>
      ),
    },
    {
      title: "Education",
      content: (
        <textarea
          name="education"
          placeholder="Education details (you can format as needed)"
          onChange={handleChange}
        />
      ),
    },
    {
      title: "Skills",
      content: (
        <textarea
          name="skills"
          placeholder="List skills (comma-separated)"
          onChange={handleChange}
        />
      ),
    },
    {
      title: "References",
      content: (
        <textarea
          name="references"
          placeholder="List references with name, org, contact"
          onChange={handleChange}
        />
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 p-6 space-x-6">
      {/* Left: Form */}
      <div className="w-1/2 bg-white p-6 shadow rounded space-y-4">
        <h2 className="text-xl font-bold">{steps[currentStep].title}</h2>
        <div className="space-y-2">{steps[currentStep].content}</div>
        <div className="flex justify-between pt-4">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-gray-600"
          >
            Back
          </button>
          <button
            disabled={currentStep === steps.length - 1}
            onClick={() => setCurrentStep(currentStep + 1)}
            className="text-blue-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="w-1/2 flex justify-center items-start overflow-y-auto">
        <div className="bg-white shadow rounded-xl p-8 w-full max-w-[600px] font-serif text-gray-800">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{formData.fullName}</h1>
            <p className="italic">{formData.jobTitle}</p>
            <p>{formData.address}</p>
            <p>{formData.phone} · {formData.email}</p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div>
            <h2 className="uppercase font-bold text-sm mb-1">Profile</h2>
            <p className="mb-4 break-words whitespace-pre-wrap">{formData.profile}</p>
          </div>

          <div>
            <h2 className="uppercase font-bold text-sm mb-1">Employment History</h2>
            {formData.experiences.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between font-bold">
                  <span>{exp.role}, {exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <div className="text-sm italic">{exp.dates}</div>
                <p className="text-sm whitespace-pre-wrap">{exp.duties}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="uppercase font-bold text-sm mb-1">Education</h2>
            <p className="text-sm break-words whitespace-pre-wrap">{formData.education}</p>
          </div>

          <div>
            <h2 className="uppercase font-bold text-sm mb-1">Skills</h2>
            <ul className="list-disc list-inside text-sm">
              {formData.skills.length > 0 &&
                formData.skills.split(",").map((skill, i) => <li key={i}>{skill.trim()}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="uppercase font-bold text-sm mb-1">References</h2>
            <p className="text-sm whitespace-pre-wrap">{formData.references}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderTim;