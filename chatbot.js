
const apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';
const projectId = 'YOUR_PROJECT_ID';
const sessionId = 'YOUR_SESSION_ID';
const languageCode = 'en-US';

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = '';

    const messageElement = document.createElement('div');
    messageElement.textContent = `You: ${userInput}`;
    document.getElementById('messages').appendChild(messageElement);

    const response = await fetch(`https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            queryInput: {
                text: {
                    text: userInput,
                    languageCode: languageCode
                }
            }
        })
    });

    const data = await response.json();
    const botMessage = data.queryResult.fulfillmentText;

    const botMessageElement = document.createElement('div');
    botMessageElement.textContent = `Bot: ${botMessage}`;
    document.getElementById('messages').appendChild(botMessageElement);
}