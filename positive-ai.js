const API_KEY = "AIzaSyBj_RU6YXQS91ghsWC5EfyBIJ6PQM8JD2E"; 

const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const textEl = document.getElementById("affirmationText");
const refreshBtn = document.getElementById("refreshBtn");

const getAffirmation = async () => {
 refreshBtn.disabled = true;

  textEl.innerHTML = `<span>💬</span> Generating...`;

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
          text: "Give me sentence positive affirmation"
          }]
        }]
      })
    });
    if (!response.ok) {
  throw new Error(response.status.toString());
}

    const data = await response.json();

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if(!output){
        throw new Error("No affiration received");
      }

    textEl.innerHTML = `<span>💬</span> ${output}`;
} catch (error) {

  if (error.message.includes("429")) {
    textEl.innerHTML = `<span>⚠️</span> Too many requests, wait a bit`;
  } else {
    textEl.innerHTML = `<span>⚠️</span> Failed to load affirmation`;
  }

  console.error(error);
}
}

document.addEventListener("DOMContentLoaded", getAffirmation);
refreshBtn.addEventListener("click", getAffirmation);
