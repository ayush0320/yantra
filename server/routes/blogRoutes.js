import express from "express";
import {addBlog, getAllBlogs} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import {deleteBlogsById, getBlogsById, togglePublishBlogById} from "../controllers/blogController.js";

// Create a router for blog-related routes
const blogRouter = express.Router();

// Route to add a new blog post
blogRouter.post(
    '/add',
    auth,
    upload.single('image'),
    addBlog);

blogRouter.get('/all', getAllBlogs);
blogRouter.post('/:blogId', getBlogsById);
blogRouter.post('/delete/:blogId', auth, deleteBlogsById);
blogRouter.post('/toggle-publish/:blogId', auth, togglePublishBlogById);

export default blogRouter;