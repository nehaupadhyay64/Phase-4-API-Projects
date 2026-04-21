
const API_KEY = "AIzaSyCPAiMLBMyZqhEKdR6KlpewNnLgrpm_tpw";

const topicInput = document.getElementById("topic");
const generateBtn = document.getElementById("generateBtn");
const questionBox = document.getElementById("question");
const answerBox = document.getElementById("answer");

generateBtn.addEventListener("click", generateQuiz);

async function generateQuiz() {

  const topic = topicInput.value.trim();

  if (!topic) {
    alert("Please enter a topic");
    return;
  }
  answerBox.style.display ="block";

  questionBox.textContent = "Generating quiz...";
  answerBox.textContent = "";

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Create one quiz question and answer about ${topic}. Format: Question: ... Answer: ...`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log(data);

  
    if (data.candidates && data.candidates.length > 0) {

      const text = data.candidates[0].content.parts[0].text;

      const parts = text.split("Answer:");

      questionBox.textContent = parts[0];
      answerBox.textContent = "Answer: " + (parts[1] || "");

    } else {

      questionBox.textContent = "No response from API";
      console.log(data);

    }

  } catch (error) {

    console.error(error);
    questionBox.textContent = "API Error";

  }

}


