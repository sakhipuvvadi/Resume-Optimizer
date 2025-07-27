import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ResumeBuilderT1() {
  const [step, setStep] = useState(1);
  const resumeRef = useRef()
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    twitter: '',
    profile: '',
    education: [],
    expertise: '',
    experiences: [],
  });

  const [newEducation, setNewEducation] = useState({
    degree: '',
    school: '',
    years: '',
  });
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    date: '',
    description: '',
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };
  const handleEducationChange = (e) => {
    setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
  };
  
  const addEducation = () => {
    setForm({ ...form, education: [...form.education, newEducation] });
    setNewEducation({ degree: '', school: '', years: '' });
  };
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };
  const addExperience = () => {
    setForm({ ...form, experiences: [...form.experiences, newExperience] });
    setNewExperience({ title: '', company: '', date: '', description: '' });
  };
  const handleDownload = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${form.name ? form.name + '-' : ''}resume.pdf`);
  };
  

  return (
    <div className="flex min-h-screen bg-[#f3f3f3] px-4 py-6 gap-4 overflow-hidden">
      {/* LEFT: Step-by-step Form */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow overflow-y-auto space-y-4">
        <h2 className="text-xl font-bold">Build Your Resume</h2>

        {/* Step-based form */}
        {step === 1 && (
          <>
            <input className="w-full p-2 border rounded" name="name" placeholder="Full Name" onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="jobTitle" placeholder="Job Title" onChange={handleChange} />
            <input type="file" onChange={handleImageUpload} className="w-full p-2 border rounded" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNext}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <input className="w-full p-2 border rounded" name="email" placeholder="Email" onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="phone" placeholder="Phone" onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="location" placeholder="Location" onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="website" placeholder="Website" onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="linkedin" placeholder="LinkedIn" onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="twitter" placeholder="Twitter" onChange={handleChange} />
            <div className="flex justify-between">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={handlePrev}>Back</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNext}>Next</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {/* <textarea className="w-full p-2 border rounded"placeholder="Profile Summary" onChange={handleChange} /> */}
            <textarea
              className="w-full resize-y break-words p-2 border rounded" name="profile"  placeholder="Profile Summary"
              onChange={handleChange}
              cols={70}
              rows={6}
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNext}>Next</button>
          </>
        )}

{step === 4 && (
  <>
    <input className="w-full p-2 border rounded" name="degree" placeholder="Enter Your Degree/Major" value={newEducation.degree} onChange={handleEducationChange} />
    <input className="w-full p-2 border rounded" name="school" placeholder="Name of University" value={newEducation.school} onChange={handleEducationChange} />
    <input className="w-full p-2 border rounded" name="years" placeholder="Years (e.g., 2005 - 2007)" value={newEducation.years} onChange={handleEducationChange} />
    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addEducation}>Add Education</button>
    <div className="flex justify-between mt-2">
      <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={handlePrev}>Back</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNext}>Next</button>
    </div>
  </>
)}

        {step === 5 && (
          <>
            <textarea className="w-full p-2 border rounded" name="expertise" placeholder="Expertise (comma-separated)" onChange={handleChange} />
            <div className="flex justify-between">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={handlePrev}>Back</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNext}>Next</button>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <input className="w-full p-2 border rounded" name="title" placeholder="Job Title" value={newExperience.title} onChange={handleExperienceChange} />
            <input className="w-full p-2 border rounded" name="company" placeholder="Company" value={newExperience.company} onChange={handleExperienceChange} />
            <input className="w-full p-2 border rounded" name="date" placeholder="Years" value={newExperience.date} onChange={handleExperienceChange} />
            <textarea className="w-full p-2 border rounded" name="description" cols={70} placeholder="Description" value={newExperience.description} onChange={handleExperienceChange} />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addExperience}>Add Experience</button>
          </>
        )}
        <div className="p-4">
    <button
      onClick={handleDownload}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
    >
      Download PDF
    </button>
  </div>
      </div>

      {/* RIGHT: Live Preview */}
      <div ref={resumeRef} className="w-1/2 bg-white rounded-lg shadow p-6 text-gray-800 font-serif">
        <div className="flex">
          <div className="w-1/3 bg-[#fcefe8] p-4 text-sm">
            <img src={image || "https://i.pravatar.cc/100"} alt="Profile" className="rounded-full w-24 h-24 mx-auto mb-4" />
            {(form.phone || form.email || form.location || form.website || form.linkedin || form.twitter || form.instagram) && (
            <h3 className="bg-[#9b9997] text-white text-center px-5 py-0 text-lg tracking-widest mx-auto w-full">CONTACT</h3>
            )}
            <p className="break-words">{form.phone}</p>
            <p className="break-words">{form.email}</p>
            <p className="break-words">{form.location}</p>
            <p className="break-words">{form.website}</p>
            <p className="break-words">{form.linkedin}</p>
            <p className="break-words">{form.twitter}</p>
            {form.education.length > 0 && (
              <>
                <h3 className="bg-[#9b9997] text-white text-center px-5 py-0 text-lg tracking-widest mx-auto w-full">EDUCATION</h3>
                {form.education.map((edu, index) => (
                  <div key={index} className="mb-1">
                    <p className="font-semibold">{edu.degree}</p>
                    <p>{edu.school}</p>
                    <p className="text-sm italic">{edu.years}</p>
                  </div>
                ))}
              </>
            )}

            {form.expertise && (
            <h3 className="bg-[#9b9997] text-white text-center px-5 py-0 text-lg tracking-widest mx-auto w-full">EXPERTISE</h3>
            )}
            {form.expertise &&
              form.expertise
                .split(',')
                .map((skill, i) => (
                  <p key={i}>{skill.trim()}</p>
            ))}
          </div>

          <div className="flex-1 px-6">
          <div className="bg-[#9b9997] p-4 text-center mb-2 text-white">
            <h1 className="text-3xl tracking-widest">{form.name || 'ALICE WILLIAMS'}</h1>
            <hr className="border-t-2 border-white w-12 mx-auto my-1" />
            <p className="uppercase tracking-wide text-sm">{form.jobTitle || 'Social Media Manager'}</p>
          </div>

            
            {form.profile && (
              <section>
              <h2 className="bg-[#9b9997] text-white text-center px-5 py-0 text-lg font-bold tracking-widest mx-auto w-full">PROFILE</h2>
              <p className="mt-2 whitespace-pre-line break-words overflow-hidden break-all">{form.profile}</p>
            </section>  
            )}

            <section className="mt-4">
            {form.experiences && (
              <h2 className="text-sm font-bold bg-[#fcefe8] p-1 inline-block w-full text-center">PROFESSIONAL EXPERIENCE</h2>
            )}
              {form.experiences.map((exp, index) => (
                <div key={index} className="mt-2">
                  <p className="font-bold">{exp.title}</p>
                  <p className="italic text-sm">{exp.company} | {exp.date}</p>
                  <p className="break-words whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
