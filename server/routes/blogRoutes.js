import express from "express";
import {
    addBlog,
    addComment,
    getBlogComments,
    getAllBlogs,
    deleteBlogsById,
    getBlogsById,
    togglePublishBlogById,
    generateContent
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import {} from "../controllers/blogController.js";

// Create a router for blog-related routes
const blogRouter = express.Router();

// Route to add a new blog post
blogRouter.post(
    '/add',
    auth,
    upload.single('image'),
    addBlog);

blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogsById);
blogRouter.post('/delete/:blogId', auth, deleteBlogsById);
blogRouter.post('/toggle-publish/:blogId', auth, togglePublishBlogById);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate', auth, generateContent);

export default blogRouter;