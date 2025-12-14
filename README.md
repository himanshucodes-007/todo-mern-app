# 📝 TODO MERN Application

A full-stack **TODO application** built using the **MERN Stack** to revise and demonstrate core full-stack development concepts such as authentication, RESTful APIs, CRUD operations, and modern frontend UI with animations.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📁 Project Structure
```bash
todo-mern-app/
│
├── backend/
│ ├── config/ # DB & environment configuration
│ ├── controllers/ # Business logic
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Auth & error handling
│ ├── utils/ # Helper functions
│ ├── server.js # Entry point
│ └── .env # Environment variables
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md
```

---

## 🔐 Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Secure Password Hashing
- Logout functionality

### Task Management
- Create tasks
- Read tasks (user-specific)
- Update tasks
- Delete tasks

### API
- RESTful APIs
- Protected routes using middleware
- Proper HTTP status codes

### UI/UX
- Minimalistic design
- Smooth animations
- Responsive layout

---

## ⚙️ Working of the Application

1. User registers or logs in.
2. Backend generates a JWT token.
3. Token is stored on the client.
4. Protected APIs verify token using middleware.
5. User can perform CRUD operations on tasks.
6. Frontend communicates with backend via REST APIs.

---

## 🛠️ How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```
### Frontend
```bash
cd frontend
npm install
npm run dev
