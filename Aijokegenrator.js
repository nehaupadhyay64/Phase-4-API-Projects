const API_KEY = "AIzaSyBj_RU6YXQS91ghsWC5EfyBIJ6PQM8JD2E"; 
const API_ENDPOINT =`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;
const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const jokeText = document.getElementById('jokeText');

generateBtn.addEventListener('click', async () => {

  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert('Please enter a prompt!');
    return;
  }

  jokeText.textContent = 'Generating...';

  try {

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
  contents: [{
    role: "user",
    parts: [{
      text: `Give me a short joke about ${prompt}`
    }]
  }]
})
    });
  
  

    const data = await response.json();
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || ' give the joke generated!'; 
    console.log(data);

  jokeText.innerText = output;

  } catch (error) {
    console.error('Error:', error);
    jokeText.textContent = 'API error aa gaya!';
  }

});