import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import admintRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// Connect to MongoDB
await connectDB();

// CORS configuration
const allowedOrigins = [
  "https://yantra-gules.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Middleware
app.use(express.json()); // To parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/admin", admintRouter);
app.use("/api/blog", blogRouter);

// Sample route
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
