# Yantra AI 🚀

Live Demo - https://yantra-gules.vercel.app/

**Yantra AI** is a modern **full‑stack blogging platform** that lets admins create and manage posts, upload images, and generate blog content using **Gemini AI**.  
It includes a **React + Vite frontend** and an **Express + MongoDB backend**.

---

## ✨ Features

- ✅ **Admin login with JWT authentication**
- 📝 **Create, publish, and delete blogs**
- 🖼️ **Upload and optimize images (ImageKit)**
- 💬 **Add comments + admin approval**
- 🤖 **AI blog content generation (Gemini)**

---

## 🧠 Beginner‑Friendly Tech Stack (Simple Explanation)

| Tech                   | What it does                                           |
| ---------------------- | ------------------------------------------------------ |
| **React + Vite**       | Builds the frontend UI and runs it fast in development |
| **Express.js**         | Backend server that handles API requests               |
| **MongoDB + Mongoose** | Stores blogs and comments in a database                |
| **JWT**                | Secure admin authentication                            |
| **ImageKit**           | Handles image uploads & optimization                   |
| **Gemini API**         | Generates blog content with AI                         |

---

## 📂 Project Structure

```
yantra/
├─ client/     # React + Vite frontend
├─ server/     # Express + MongoDB backend
└─ README.md
```

---

## 🚀 Getting Started (Step‑by‑Step)

### 1) Clone the Repository

```bash
git clone https://github.com/ayush0320/yantra.git
cd yantra
```

---

### 2) Start the Frontend (Client)

```bash
cd client
npm install
npm run dev
```

✅ This runs your UI at `http://localhost:5173` (default Vite port).

---

### 3) Start the Backend (Server)

```bash
cd ../server
npm install
npm run server
```

✅ This runs your backend API (default port is `3000` unless changed in `.env`).

---

## 🔑 Environment Variables (Required)

Create a `.env` file inside the **server/** folder:

```
# server/.env

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster-url

# Auth
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strongpassword

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Server Port
PORT=3000
```

✅ **Why this is important:**  
These values are **secret keys**, so they must be stored in `.env`, not in code.

---

## 📌 API Routes (Quick Overview)

### Admin Routes

- `POST /api/admin/login` → Login as admin
- `GET /api/admin/blogs` → View all blogs
- `GET /api/admin/comments` → View all comments
- `POST /api/admin/approve-comment` → Approve comment
- `POST /api/admin/delete-comment` → Delete comment

### Blog Routes

- `POST /api/blog/add` → Add blog (admin only)
- `GET /api/blog/all` → Get published blogs
- `GET /api/blog/:blogId` → Get single blog
- `POST /api/blog/delete/:blogId` → Delete blog
- `POST /api/blog/toggle-publish/:blogId` → Publish / unpublish
- `POST /api/blog/add-comment` → Add comment
- `POST /api/blog/comments` → Get approved comments
- `POST /api/blog/generate` → Generate blog content (AI)

---

## 🛠 Troubleshooting (Common Issues)

### ❓ Backend not starting

✅ Make sure Node.js is installed:

```bash
node -v
```

**Use Node 20+** (required by Gemini SDK).

---

### ❓ "MongoDB connection error"

- Check `MONGODB_URI` in `.env`
- Make sure your IP is allowed in MongoDB Atlas

---

### ❓ Image upload not working

- Verify ImageKit keys are correct
- Ensure `IMAGEKIT_URL_ENDPOINT` is valid

---

### ❓ Admin login fails

- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
- Ensure frontend sends login request to correct backend URL

---

## 📚 Learning Resources (Beginner Friendly)

- React: https://react.dev/learn
- Vite: https://vitejs.dev/guide
- Express.js: https://expressjs.com/
- MongoDB: https://www.mongodb.com/docs/manual/
- JWT Auth: https://jwt.io/introduction
- ImageKit Docs: https://docs.imagekit.io/
- Gemini API: https://ai.google.dev/

---

## ✅ License

This project is licensed under the **MIT License**.

---

## 🙌 Contributing

If you want to improve Yantra AI, feel free to open an issue or pull request!
