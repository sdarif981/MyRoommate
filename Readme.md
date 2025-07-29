# MyRoommate

A full-stack matchmaking web app for students to find ideal roommates based on lifestyle preferences and chat with them in real-time.

🔗 [Live App](https://my-roommate-zeta.vercel.app/)  
📂 [GitHub Repository](https://github.com/sdarif981/MyRoommate)

---

## ✨ Features

- 🧠 Intelligent roommate matching algorithm using lifestyle and college preferences.
- 🔍 Advanced filtering (sleep patterns, cleanliness, noise tolerance, etc.).
- 👤 JWT-based user authentication (secure login & registration).
- 🖼️ Profile picture (DP) upload and display.
- 💬 Real-time chat between matched users (Socket.io).
- 📱 Fully responsive UI for mobile, tablet, and desktop.
- ⚡ Fast, modern performance with Vite and Tailwind CSS.

---

## 🛠 Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, Redux Toolkit
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Real-Time Messaging:** Socket.io
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📁 Project Structure

```
MyRoommate/
├── backend/          # Node.js server (Render deployment)
├── frontend/         # React client (Vercel deployment)
└── README.md
```

---

## ⚙️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/sdarif981/MyRoommate.git
cd MyRoommate
```

---

### 2. Start Backend Server

```bash
cd backend
npm install
nodemon server.js
```

Make sure your backend runs at `http://localhost:5000`.

---

### 3. Configure Frontend

In `frontend/src/constants/constant.js`, switch API URLs for local development:

```js
// For local development
export const USER_API = "http://localhost:5000/api/user";
export const MESSAGE_API = "http://localhost:5000/api/message";
```

---

### 4. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

App will run at: `http://localhost:5173`

---

## 🧠 What I Learned

- JWT-based authentication and secure routing
- Global state management with Redux Toolkit
- Building fully responsive layouts with Tailwind CSS
- Real-time chat using Socket.io
- Profile picture upload and media handling
- Deploying full-stack applications (Render + Vercel)

---

## 📸 Screenshots

### Homepage  
![Homepage](./screenshots/homepage.png)

### Search & Filters  
![Search](./screenshots/search.png)

### Messages  
![Messages](./screenshots/messages.png)

> *(Replace these with real screenshots or hosted image links)*

---

## 🚀 Deployment Links

- **Frontend (Vercel):** https://my-roommate-zeta.vercel.app/
- **Backend (Render):** https://myroommate.onrender.com/

---

## 📌 Future Enhancements

- Email notifications and reminders
- Admin dashboard for reporting/moderation
- Improved match score logic with ML-based suggestions
- In-app alerts and messaging notifications

---

## 🙋‍♂️ Author

**Arif Syed**  
GitHub: [@sdarif981](https://github.com/sdarif981)
