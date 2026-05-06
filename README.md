# 📝 Full-Stack To-Do Application

> A modern, robust, and full-stack task management application built with the MERN-like stack (MongoDB, Express, React with Vite & TypeScript, Node.js).

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-success?style=for-the-badge&logo=vercel)](#) <!-- Add your live app link here -->

## ✨ Features

- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Task Management:** Full CRUD operations (Create, Read, Update, Delete) for user-specific tasks.
- **Protected Routes:** Secure API endpoints ensuring users can only access and modify their own tasks.
- **State Management:** Efficient and scalable state handling using Zustand.
- **Responsive UI:** Modern and sleek interface built with Tailwind CSS v4.
- **Type Safety:** Strongly typed frontend with TypeScript to catch errors early.

## 🛠️ Tech Stack

### Frontend
- **Framework:** ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) React 19
- **Tooling:** ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E) Vite
- **Language:** ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) TypeScript
- **Styling:** ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) Tailwind CSS v4
- **State Management:** ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=react&logoColor=white) Zustand
- **Routing:** ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) React Router DOM

### Backend
- **Runtime:** ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) Node.js
- **Framework:** ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) Express.js
- **Database:** ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token) & bcryptjs

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Todo-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/src` directory (or backend root) with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
   Run the backend server:
   ```bash
   node src/index.js
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Run the frontend development server:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate user & get token

### Tasks (Requires Bearer Token)
- `GET /api/tasks/` - Get all tasks for the logged-in user
- `POST /api/tasks/` - Create a new task
- `PATCH /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](LICENSE) licensed.