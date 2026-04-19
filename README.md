<div align="center">

# 🔐 MERN Authentication System

A full-stack authentication system with JWT, protected routes, a live dashboard, and activity logging.

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## ✨ Features

- 🔑 &nbsp;**JWT Authentication** — Secure signup & login with bcrypt password hashing and 7-day tokens
- 🛡️ &nbsp;**Protected Routes** — Frontend guards redirect unauthenticated users to login
- 📊 &nbsp;**Live Dashboard** — Real-time user stats: account age, total logins, and activity count
- 📋 &nbsp;**Activity Logging** — Every key event (signup, login, profile update) is tracked in MongoDB
- ✏️ &nbsp;**Profile Management** — Edit name and email via a modal with duplicate-email validation
- 🌐 &nbsp;**Global Auth Context** — React context manages auth state across the entire app

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| **Frontend** | React 19, React Router v7, Framer Motion, Tailwind CSS v4, Vite |
| **Backend**  | Node.js, Express 5, Mongoose |
| **Database** | MongoDB |
| **Auth**     | JWT (jsonwebtoken), bcryptjs |

---

## 📁 Project Structure

```
mern-auth/
├── backend/
│   ├── middleware/
│   │   └── protect.js          # JWT verification middleware
│   ├── models/
│   │   ├── User.js             # User schema (name, email, password)
│   │   └── ActivityLog.js      # Activity log schema
│   ├── routes/
│   │   ├── auth.js             # POST /signup, POST /login, GET /me
│   │   └── user.js             # GET /dashboard-data, PUT /profile
│   ├── server.js               # Express app entry point
│   └── .env                    # Environment variables (not committed)
│
└── frontend/
    └── src/
        ├── components/
        │   └── AuthLayout.jsx  # Shared layout for auth pages
        ├── context/            # React auth context & provider
        ├── pages/
        │   ├── Login.jsx
        │   ├── Signup.jsx
        │   └── Dashboard.jsx   # Protected dashboard
        └── App.jsx             # Routes & protected route logic
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mern-auth.git
cd mern-auth
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_super_secret_key
PORT=5000
```

```bash
npm run dev   # starts with nodemon on http://localhost:5000
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev   # starts Vite on http://localhost:5173
```

---

## 🔌 API Reference

### Auth — `/api/auth`

| Method | Endpoint  | Description                | Auth |
|--------|-----------|----------------------------|------|
| POST   | `/signup` | Register a new user        | ❌   |
| POST   | `/login`  | Login and receive a JWT    | ❌   |
| GET    | `/me`     | Get current logged-in user | ✅   |

### User — `/api/user`

| Method | Endpoint          | Description                     | Auth |
|--------|-------------------|---------------------------------|------|
| GET    | `/dashboard-data` | Fetch stats & recent activity   | ✅   |
| PUT    | `/profile`        | Update user name and/or email   | ✅   |

---

## 🔒 How It Works

```
User logs in → Server validates credentials → JWT issued
       ↓
JWT stored in localStorage
       ↓
Protected API requests → Bearer token in Authorization header
       ↓
protect middleware verifies token → Request granted or 401
```

On the frontend, protected pages check for a valid token via the Auth Context. Unauthenticated users are automatically redirected to `/login`.

---

## 📋 Activity Log Events

| Event              | Triggered When                      |
|--------------------|-------------------------------------|
| `Account Created`  | User successfully signs up          |
| `Logged In`        | User successfully logs in           |
| `Profile Updated`  | User saves profile changes          |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
