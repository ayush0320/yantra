import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import admintRouter from './routes/adminRoutes.js';

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.get('/', (req, res) => { res.send('Hello, World!')});
app.use('/api/admin', admintRouter);

// Sample route
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;