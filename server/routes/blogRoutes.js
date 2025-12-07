import express from "express";
import {addBlog} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

// Create a router for blog-related routes
const blogRouter = express.Router();

// Route to add a new blog post
blogRouter.post(
	'/add',
	auth,
	upload.fields([
		{ name: 'image', maxCount: 1 },
		{ name: 'thumbnail', maxCount: 1 },
	]),
	addBlog
);

export default blogRouter;