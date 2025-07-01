# Outlook Draft Mail Generator

This project allows users to generate pre-filled email drafts for Outlook Desktop using a local Node.js server and a simple HTML form interface.

## ✨ Features

- Submit subject, body, and multiple recipients.
- Attach a CV file (`.pdf`, `.doc`, or `.docx`).
- Automatically generates `.eml` draft files saved to a specified folder.
- Outlook opens the drafts using a custom `myapp://` URI scheme.

---

## 📁 Project Structure

project-root/
│
├── public/
│ ├── index.html # HTML form for user input
│ ├── style.css # Optional CSS styling
│ └── script.js # JavaScript handling the form submission
│
├── server/
│ └── server.js # Node.js Express server for generating .eml drafts
│
├── uploads/ # Temporary file storage (created at runtime)
├── README.md # You are here
└── package.json

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- Outlook Desktop installed and set as default for `.eml` files

### 2. Install dependencies

```bash
cd server
npm install
3. Run the server
bash
Copy
Edit
node server.js
The server will start on: http://localhost:3000

4. Open the client
Use a local server (like Live Server in VS Code) to serve index.html
Example:
http://127.0.0.1:5500/public/index.html

📨 How It Works
The user fills the form and selects a CV file.

The form sends a POST request to http://localhost:3000/generate.

The server generates .eml files using nodemailer.

Drafts are saved to a local folder (C:/Drafts by default).

A custom URI (myapp://open?path=...) is returned to trigger Outlook to open the drafts.

✅ Note: To support myapp:// scheme, a small C# app is required to handle it and open Outlook with the files. This should be installed and registered on your OS.

🔧 Configuration
Drafts output path: C:/Drafts

Temporary file upload path: uploads/

Server endpoint: /generate

You can change paths inside server.js.

📦 Tech Stack
Frontend: HTML, JS

Backend: Node.js, Express, Multer, Nodemailer

Desktop Integration: C# app registered to handle myapp:// links (see separate folder)

📄 License
This project is for educational purposes.
Feel free to use and modify it as needed.

