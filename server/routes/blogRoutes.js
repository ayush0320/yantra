import express from "express";
import {addBlog} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";

// Create a router for blog-related routes
const blogRouter = express.Router();

// Route to add a new blog
blogRouter.post('/add', upload.single('image'), addBlog);