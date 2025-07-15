# React Calculator with History (JSON Server Integration)

This is a simple React calculator app that allows users to perform calculations, view a history of previous calculations, and delete specific entries. The app supports persistent history storage using a local JSON Server.

---

## ✨ Features

- Basic arithmetic calculator  
- Calculation history with timestamps  
- History sidebar with resizable width  
- Delete history items individually  
- Responsive design for desktop and mobile  
- JSON Server integration for storing and fetching history  
- Auto-detects if JSON Server is available and falls back to local-only history if not  

---

## 📂 Project Structure

```
src/
│
├── App.tsx              # Main component managing calculator and history
├── Calculator.tsx       # Calculator input and display component
├── HistoryBtn.tsx       # Button to open the history sidebar
├── HistoryPage.tsx      # Sidebar component for showing the history
├── HistoryList.tsx      # List component for mapping history items
├── LineHistory.tsx      # Individual history item component
├── Copyright.tsx        # Footer with copyright
│
├── index.tsx            # Entry point for React app
├── index.css            # Global and component styling
```


---

## ⚙️ Requirements

- Node.js and npm
- JSON Server
- Mathjs
- Uuid
- Axios

---

## 🚀 Getting Started

### 1. Install dependencies:

```bash
npm install
npm install json-server
npm install mathjs
npm install uuid
npm install axios
```

2. Start the JSON Server (for history storage):

run:

```bash
npx json-server --watch data/db.json --port 3500
```
The API will be available at:
http://localhost:3500/history

3. Start the React app:

In a separate terminal window:

```bash
npm run dev
```
The app will run at:
http://localhost:3000

## 📋 Notes

- If the JSON Server is not running, the app will still work, but the history will only be saved locally (in memory; no persistence after refresh).
- The sidebar for history can be resized by dragging its right edge.

---

## 📌 Technologies Used

- React + TypeScript
- Axios
- Math.js
- UUID
- JSON Server
- CSS with media queries

---

## 📄 License

It is important to emphasize that copyrights are just to appear official. You are allowed to do whatever you want with the files.

---

To clone this repository, run:

```bash
git clone https://github.com/ChagaiLevi/Calculator.git
```

