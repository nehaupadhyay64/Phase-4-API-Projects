const API_KEY = "AIzaSyBj_RU6YXQS91ghsWC5EfyBIJ6PQM8JD2E"; 
const API_BASE_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
async function askQuestion() {
    const question = document.getElementById('question').value;
    const answerDiv = document.getElementById('answer');
    answerDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents:[ 
                    {
                        parts:[{
                            text: `You are user friendly AI . You have to give answer of whatever user will ask according to given input ${question} and don't give extra things in short or 2-3 lines`
                        }]
                    }
                ]
            })
        });


        const data = await response.json();

        const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Try again";

        answerDiv.innerText = output;


    } catch (error) {
        answerDiv.innerHTML = 'Error fetching answer.';
        console.error(error);
    }
}

async function summarizeText() {
    const text = document.getElementById('textToSummarize').value;
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = 'Summarizing...';

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents:[
                {
                    parts:[{
                        text: `You are user friendly AI. Summarize the following text in 2-3 lines: ${text}`
                    }]
                }
              ]
            })
         });
    
     
        const data = await response.json();

        const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Try again";
        summaryDiv.innerHTML = output;

    } catch (error) {
        summaryDiv.innerHTML = 'Error summarizing text.';
        console.error(error);
    }
}

async function generateIdeas() {
    const prompt = document.getElementById('ideaPrompt').value;
    const ideasDiv = document.getElementById('ideas');
    ideasDiv.innerHTML = 'Generating ideas...';

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',         
            },
            body: JSON.stringify({
               contents:[
                {
                   parts:[{
                      text:`You are user friendly AI.Generate simple and unique ideas based on the user's topic:${prompt}. Give each idea in 1 line only`
                   }]
                }
               ] 
            })
        });

        const data = await response.json();
        
        const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Try again";
        ideasDiv.innerHTML = output;

    } catch (error) {
        ideasDiv.innerHTML = 'Error generating ideas.';
        console.error(error);
    }
}

async function findDefination() {
    const term = document.getElementById('term').value;
    const defDiv = document.getElementById('defination');
    defDiv.innerHTML = 'Finding definition...';

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents:[
                    {
                     parts:[{
                        text:`You are user friendly AI.Give a simple and clear defination of the term ${term} in 2-3 lines only.`
                     }]
                    }
                ]
            })
        });

        const data = await response.json();

        const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Defination not found.";
        defDiv.innerText = output;
        
    } catch (error) {
        defDiv.innerHTML = 'Error fetching definition.';
        console.error(error);
    }
}