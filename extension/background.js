console.log("Student Buddy background service worker loaded!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "mentorMessage") {

        fetch("http://127.0.0.1:3000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message.text
            })
        })
        .then(response => response.json())
        .then(data => {

            sendResponse({
                success: true,
                reply: data.reply
            });

        })
        .catch(error => {

            console.error("Backend error:", error);

            sendResponse({
                success: false,
                reply: "⚠️ I couldn't connect to the Student Buddy server."
            });

        });

        return true;
    }
});