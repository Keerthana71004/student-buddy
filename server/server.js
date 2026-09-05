const express = require("express");
const cors = require("cors");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
    res.send("Student Buddy server is running!");
});

app.post("/ask", (req, res) => {

    const userMessage = req.body.message.toLowerCase();

    let reply;

    // Hint requests
    if (
        userMessage.includes("hint") ||
        userMessage.includes("stuck")
    ) {

        reply =
            "💡 Hint 1: Before writing code, think about what information " +
            "you need to remember while going through the numbers. " +
            "For each number, ask yourself: what number do I need to reach the target?";

    }

    // Approach requests
    else if (
        userMessage.includes("approach") ||
        userMessage.includes("how should i solve") ||
        userMessage.includes("how do i solve")
    ) {

        reply =
            "🧠 Think about how you could avoid checking every possible pair. " +
            "Can you keep track of numbers you have already seen while going through the array? " +
            "Also think about how you could quickly check whether the number you need has already appeared.";

    }

    // Debug requests
    else if (
        userMessage.includes("debug") ||
        userMessage.includes("error") ||
        userMessage.includes("not working")
    ) {

        reply =
            "🐛 Let's debug step-by-step. First, check your loop and condition. " +
            "For the current number, are you calculating the value needed to reach the target correctly? " +
            "Also check whether you are accidentally using the same array element twice.";

    }

    // Stronger hint
    else if (
        userMessage.includes("stronger hint") ||
        userMessage.includes("another hint") ||
        userMessage.includes("next hint")
    ) {

        reply =
            "💡 Hint 2: Instead of comparing the current number with every other number, " +
            "think about a data structure that lets you quickly check whether a number " +
            "has already been seen.";

    }

    // Solution request
    else if (
        userMessage.includes("show solution") ||
        userMessage.includes("give me the solution") ||
        userMessage.includes("full solution")
    ) {

        reply =
            "🏆 The key idea is to use a hash map. " +
            "As you iterate through the array, calculate the complement " +
            "(target - current number). Check whether that complement is already " +
            "in the hash map. If it is, you have found the two indices. " +
            "Otherwise, store the current number and its index.";

    }

    // General question
    else {

        reply =
            "🧑‍🏫 I'm here to help you learn step-by-step. " +
            "Try telling me what you have tried so far, or ask me for a hint, " +
            "help with your approach, or debugging help.";

    }

    res.json({
        success: true,
        reply: reply
    });

});

const PORT = 3000;

app.listen(PORT, "127.0.0.1", () => {
    console.log(`Student Buddy server running on http://127.0.0.1:${PORT}`);
});