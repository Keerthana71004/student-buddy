# Student Buddy

Student Buddy is a Chrome extension that acts as a programming mentor while students solve coding problems on platforms like LeetCode.

Instead of immediately giving the complete solution, Student Buddy encourages students to think through the problem by providing hints, approach guidance, debugging guidance, and explanations.

The project was designed with an AI-powered mentoring system in mind, with Gemini API integration planned through a Node.js backend. The current version uses a rule-based mentor engine as a functional fallback.

---

## ✨ Features

- 🧑‍🏫 Interactive programming mentor
- 💡 Progressive hints for coding problems
- 🧠 Guidance for developing a solution approach
- 🐛 Step-by-step debugging guidance
- 🏆 Explanation of the key solution idea when requested
- 🌐 Chrome Extension interface
- 🔌 Node.js + Express backend
- 🔒 API credentials kept outside the source code
- 🎯 Designed to encourage learning instead of immediately revealing solutions

---

## 🛠️ Tech Stack

### Frontend / Extension
- HTML
- CSS
- JavaScript
- Chrome Extension Manifest V3
### Backend
- Node.js
- Express.js
- CORS
### Planned AI Integration
- Google Gemini API
- Prompt Engineering

---

## 🏗️ Project Architecture
```text
Student Buddy
│
├── Chrome Extension
│   ├── content.js
│   ├── background.js
│   ├── style.css
│   └── manifest.json
│
└── Node.js Backend
    └── server.js
    
The current prototype uses a rule-based mentor engine, with Gemini AI planned as a future enhancement.
