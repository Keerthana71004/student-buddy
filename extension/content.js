console.log("Student Buddy loaded!");

function createStudentBuddy() {
    if (document.getElementById("student-buddy-button")) {
        return;
    }

    const button = document.createElement("button");

    button.id = "student-buddy-button";
    button.innerHTML = "✨";

    button.addEventListener("click", toggleSidebar);

    document.body.appendChild(button);

    console.log("Student Buddy button created!");
}

function toggleSidebar() {

    const existingSidebar = document.getElementById("student-buddy-sidebar");
    const button = document.getElementById("student-buddy-button");

    if (existingSidebar) {
        existingSidebar.remove();

        // Show the floating button again
        button.style.display = "block";

        return;
    }

    createSidebar();

    // Hide the floating button while sidebar is open
    button.style.display = "none";
}

function createSidebar() {

    const sidebar = document.createElement("div");

    let hintLevel = 0;

    sidebar.id = "student-buddy-sidebar";

    sidebar.innerHTML =
        '<div class="student-buddy-header">' +
            '<div>' +
                '<h2>🧑‍🏫 Student Buddy</h2>' +
                '<p>Your AI Programming Mentor</p>' +
            '</div>' +

            '<button id="student-buddy-close">×</button>' +
        '</div>' +

        '<div class="student-buddy-content">' +

            '<div class="student-buddy-greeting">' +
                '<h3>Hey!</h3>' +

                '<p>' +
                    'How can I help you with ' +
                    '<strong>"Two Sum"</strong> problem?' +
                '</p>' +
            '</div>' +

            '<div class="student-buddy-actions">' +

                '<button class="buddy-action">' +
                    '💡 I\'m Stuck' +
                '</button>' +

                '<button class="buddy-action">' +
                    '🔎 Give Me a Hint' +
                '</button>' +

                '<button class="buddy-action">' +
                    '🧠 Check My Approach' +
                '</button>' +

                '<button class="buddy-action">' +
                    '🐛 Help Me Debug' +
                '</button>' +

            '</div>' +

            '<div class="student-buddy-chat">' +

                '<div class="buddy-message">' +
                    '<strong>Student Buddy</strong>' +

                    '<p>' +
                        'Tell me what you\'re thinking, and I\'ll help you take the next step.' +
                    '</p>' +
                '</div>' +

            '</div>' +

        '</div>' +

        '<div class="student-buddy-input">' +

            '<input id="buddy-input" type="text" placeholder="Ask your mentor..." />' +

            '<button id="buddy-send">➤</button>' +

        '</div>';


    document.body.appendChild(sidebar);


    document
        .getElementById("student-buddy-close")
        .addEventListener("click", () => {
            sidebar.remove();
        });
    document
    .querySelector(".buddy-action:nth-child(2)")
    .addEventListener("click", () => {

        const chat = document.querySelector(".student-buddy-chat");

        hintLevel++;

        let hintText;

        if (hintLevel === 1) {

            hintText =
                "💡 Hint 1: Before writing code, think about what information " +
                "you need to remember while going through the numbers.";

        } else if (hintLevel === 2) {

            hintText =
                "💡 Hint 2: Instead of comparing every pair of numbers, " +
                "can you think of a way to quickly check whether you've " +
                "already seen the number you need?";

        } else {

            hintText =
                "💡 Hint 3: Consider using a hash map to store numbers " +
                "you have already visited and their indices.";

        }

        const message = document.createElement("div");

        message.className = "buddy-message";

        message.innerHTML =
            "<strong>Student Buddy</strong>" +
            "<p>" + hintText + "</p>";

        chat.appendChild(message);

        document.querySelector(".student-buddy-content").scrollTop =
    document.querySelector(".student-buddy-content").scrollHeight;
    });

    document
    .querySelector(".buddy-action:nth-child(3)")
    .addEventListener("click", () => {

        const chat = document.querySelector(".student-buddy-chat");

        const message = document.createElement("div");

        message.className = "buddy-message";

        message.innerHTML =
            "<strong>Student Buddy</strong>" +
            "<p>" +
            "🧠 Tell me how you are planning to solve this problem. " +
            "I'll help you evaluate your approach without giving you the solution." +
            "</p>";

        chat.appendChild(message);

        const content = document.querySelector(".student-buddy-content");

        content.scrollTop = content.scrollHeight;
    });
    document
    .querySelector(".buddy-action:nth-child(4)")
    .addEventListener("click", () => {

        const chat = document.querySelector(".student-buddy-chat");

        const message = document.createElement("div");

        message.className = "buddy-message";

        message.innerHTML =
            "<strong>Student Buddy</strong>" +
            "<p>" +
            "🐛 Paste your code or tell me what isn't working. " +
            "I'll help you find the issue step-by-step instead of giving you the fixed code." +
            "</p>";

        chat.appendChild(message);

        const content = document.querySelector(".student-buddy-content");

        content.scrollTop = content.scrollHeight;
    });
    document
    .getElementById("buddy-send")
    .addEventListener("click", () => {

        const input = document.getElementById("buddy-input");
        const chat = document.querySelector(".student-buddy-chat");

        const userText = input.value.trim();

        if (userText === "") {
            return;
        }

        // Add student's message
        const studentMessage = document.createElement("div");

        studentMessage.className = "buddy-message";

        studentMessage.innerHTML =
            "<strong>You</strong>" +
            "<p>" + userText + "</p>";

        chat.appendChild(studentMessage);

        // Send message to background service worker
chrome.runtime.sendMessage(
    {
        type: "mentorMessage",
        text: userText
    },
    (response) => {

        const buddyMessage = document.createElement("div");

        buddyMessage.className = "buddy-message";

        if (response && response.success) {

            buddyMessage.innerHTML =
                "<strong>Student Buddy</strong>" +
                "<p>" +
                response.reply +
                "</p>";

        } else {

            buddyMessage.innerHTML =
                "<strong>Student Buddy</strong>" +
                "<p>" +
                "⚠️ Something went wrong while contacting the mentor." +
                "</p>";
        }

        chat.appendChild(buddyMessage);

const content = document.querySelector(".student-buddy-content");

if (content) {
    content.scrollTop = content.scrollHeight;
}
    }
);

        // Clear input
        input.value = "";

        // Scroll to newest message
        const content = document.querySelector(".student-buddy-content");

        content.scrollTop = content.scrollHeight;
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createStudentBuddy);
} else {
    createStudentBuddy();
}