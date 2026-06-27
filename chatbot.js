// Chatbot responses mapping
const CHATBOT_KNOWLEDGE = {
    skills: "Hitesh specializes in modern web technologies. His core skills include **Three.js & WebGL** for 3D graphics, **JavaScript (ES6+)**, **HTML5/CSS3**, **React.js**, and **Node.js**. He also has experience with **Python** and integrating intelligent APIs!",
    education: "Hitesh's academic background covers:<br><br>•**Bachelor of Computer Science (B.tech CS)** (2024 - 2028): Focused on programming concepts, data structures, algorithms, and database systems.<br>• **Higher Secondary (Class XII - Science)** (2021 - 2022): Focused on Mathematics, Physics, and Chemistry.",
    contact: "You can reach Hitesh via:<br>• Email: **hitesh@example.com**<br>• GitHub: [github.com/hitesh](#)<br>• LinkedIn: [linkedin.com/in/hitesh](#)<br><br>Or simply fill out the contact form on this page to send a direct message!",
    default: "I'm Hitesh's AI agent! You can ask me about his **skills**, **education**, or **how to contact him**. Feel free to use the quick suggestion chips below to learn more."
};

document.addEventListener("DOMContentLoaded", () => {
    const chatbotTrigger = document.getElementById("chatbot-trigger");
    const chatConsole = document.getElementById("chat-console");
    const chatCloseBtn = document.getElementById("chat-close-btn");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const chatSendBtn = document.getElementById("chat-send-btn");
    const suggestionChips = document.querySelectorAll(".suggestion-chip");

    // Toggle Chat Console
    chatbotTrigger.addEventListener("click", () => {
        chatConsole.classList.toggle("hidden");
        // Clear chat badge if present
        const badge = chatbotTrigger.querySelector(".chat-badge");
        if (badge) badge.style.display = "none";
        
        // Scroll to bottom on open
        setTimeout(scrollToBottom, 100);
    });

    chatCloseBtn.addEventListener("click", () => {
        chatConsole.classList.add("hidden");
    });

    // Handle suggestion chip click
    suggestionChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const question = chip.textContent;
            handleUserMessage(question);
        });
    });

    // Send message on click
    chatSendBtn.addEventListener("click", () => {
        sendMessage();
    });

    // Send message on Enter key
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        chatInput.value = "";
        handleUserMessage(text);
    }

    function handleUserMessage(message) {
        // Append user message
        appendMessage(message, "user");
        
        // Show typing indicator
        showTypingIndicator();

        // Process response
        setTimeout(() => {
            removeTypingIndicator();
            const responseText = getResponse(message);
            appendMessage(responseText, "ai");
        }, 1000 + Math.random() * 500); // realistic delay
    }

    function appendMessage(content, sender) {
        const messageBubble = document.createElement("div");
        messageBubble.classList.add("chat-bubble", sender);
        messageBubble.innerHTML = content;
        chatMessages.appendChild(messageBubble);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const indicator = document.createElement("div");
        indicator.classList.add("chat-bubble", "ai", "typing-indicator-bubble");
        indicator.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        indicator.id = "chat-typing-indicator";
        chatMessages.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById("chat-typing-indicator");
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(query) {
        const q = query.toLowerCase();
        
        if (q.includes("skill") || q.includes("languages") || q.includes("technologies") || q.includes("frameworks")) {
            return CHATBOT_KNOWLEDGE.skills;
        } else if (q.includes("education") || q.includes("study") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("mca") || q.includes("bsc")) {
            return CHATBOT_KNOWLEDGE.education;
        } else if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("meet") || q.includes("social")) {
            return CHATBOT_KNOWLEDGE.contact;
        } else {
            return CHATBOT_KNOWLEDGE.default;
        }
    }
});
