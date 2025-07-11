# React Calculator with History (JSON Server Integration)

This is a simple React calculator app that allows users to perform calculations, view a history of previous calculations, and delete specific entries. The app supports persistent history storage using a local JSON Server.

## ✨ Features

- Basic arithmetic calculator
- Calculation history with timestamps
- History sidebar with resizable width
- Delete history items individually
- Responsive design for desktop and mobile
- JSON Server integration for storing and fetching history
- Auto-detects if JSON Server is available and falls back to local-only history if not

## 📂 Project Structure

src/
│
├── App.tsx # Main component managing calculator and history
├── Calculator.tsx # Calculator input and display component
├── HistoryBtn.tsx # Button to open the history sidebar
├── HistoryPage.tsx # Sidebar component for showing the history
├── HistoryList.tsx # List component for mapping history items
├── LineHistory.tsx # Individual history item component
├── Copyright.tsx # Footer with copyright
│
├── index.tsx # Entry point for React app
├── index.css # Global and component styling

## ⚙️ Requirements

- Node.js and npm
- JSON Server (`json-server` npm package)

## 🚀 Getting Started

```bash
npm start
npx json-server --watch db.json --port 3500
```
The app will run at:
http://localhost:3000

📋 Notes:
If the JSON Server is not running, the app will still work, but the history will only be saved locally (in memory, no persistence after refresh).

The sidebar for history can be resized by dragging the right edge.

📌 Technologies Used
React + TypeScript

Axios

Math.js

UUID

JSON Server

CSS with media queries

📄 License
© All rights reserved to Chagai Levi Ltd.

yaml
Copy
Edit

---

### ✅ To-Do
If you'd like, I can also:
- Add screenshots.
- Write GitHub Actions for auto-tests or linting.
- Help you draft a contribution section.

Let me know if you'd like me to!
