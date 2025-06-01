const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input button');
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_URL = "http://127.0.0.1:5000/ask-gpt"; // Your local Flask server URL

// Function to create chat list items
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = `<p>${message}</p>`;
    return chatLi;
};

// Function to generate a response from GPT
const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
    };

    fetch(API_URL, requestOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            // Display the reply from the API
            messageElement.textContent = data.reply || "No response received.";
            // Add feedback options (now with the correct conversationId)
            const feedbackDiv = document.createElement('div');
            feedbackDiv.classList.add('feedback-options');
            feedbackDiv.innerHTML = `
                <button data-ai-response="${data.reply}" onclick="sendFeedback(this, 'helpful')">👍 Helpful</button>
                <button data-ai-response="${data.reply}" onclick="sendFeedback(this, 'not_helpful')">👎 Not Helpful</button>
            `;
            incomingChatLi.appendChild(feedbackDiv);

        })
        .catch((error) => {
            console.error("Error:", error);
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again!";
        })
        .finally(() => {
            chatbox.scrollTo(0, chatbox.scrollHeight);
            sendChatBtn.disabled = false; // Re-enable send button
        });
};

// Handle sending user messages and generating responses
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) {
        alert("Please enter a message!");
        return;
    }

    sendChatBtn.disabled = true; // Disable button temporarily

    // Append user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Append GPT's "Thinking..." message and generate response
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "chat-incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);

    }, 600);

    // Clear the chat input
    chatInput.value = '';
};

// Event listener for the send button
sendChatBtn.addEventListener("click", handleChat);

// Optional: Add "Enter" key functionality for sending messages
chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent new lines
        handleChat();
    }
});

// Function to handle chatbot cancellation
function cancel() {
    const chatbotComplete = document.querySelector(".chatBot");
    if (chatbotComplete && chatbotComplete.style.display !== 'none') {
        chatbotComplete.style.display = "none";

        // Ensure only one farewell message is displayed
        if (!document.querySelector('.lastMessage')) {
            const lastMsg = document.createElement("p");
            lastMsg.textContent = 'Thanks for using our Chatbot!';
            lastMsg.classList.add('lastMessage');
            document.body.appendChild(lastMsg);
        }
    }
}

//Function to send feedback to backend
async function sendFeedback(button, feedback) {
    const aiResponse = button.dataset.aiResponse;
    try {
        const response = await fetch('http://127.0.0.1:5000/save_feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                aiResponse: aiResponse,
                feedback: feedback,
                timestamp: new Date().toISOString()
            }),
        });

        if (response.ok) {
            // Feedback submitted successfully
            console.log("Feedback submitted successfully:", aiResponse);
            alert("Feedback submitted successfully")

            // Optionally provide feedback to the user (e.g., "Thank you for your feedback!")
            // and hide/disable the feedback buttons
            const feedbackOptions = document.querySelector('.feedback-options');
            if (feedbackOptions) {
                feedbackOptions.style.display = 'none';
            }
        } else {
            // Error submitting feedback
            const errorData = await response.json(); // Try to get error details from response
            const errorMessage = errorData.error || "Error submitting feedback. Please try again.";
            console.error("Error submitting feedback:", errorMessage);
            alert(errorMessage);
        }
    } catch (error) {
        // Network or other errors
        console.error("Error submitting feedback:", error);
        alert("Error submitting feedback. Please try again.");
    }
}