const API_URL = "https://11df-35-239-130-147.ngrok-free.app";

export async function uploadResume(formData) {
  const res = await fetch(`${API_URL}/upload_resume`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function getJobRecommendations(skills) {
  const res = await fetch(`${API_URL}/recommend_jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skills }),
  });
  return res.json();
}
