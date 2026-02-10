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
      // allow no-origin requests like curl/Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// handle preflight
app.options("*", cors());

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/admin", admintRouter);
app.use("/api/blog", blogRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
