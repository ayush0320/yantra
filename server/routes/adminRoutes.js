import express from 'express';
import { adminLogin, getAllCommentsAdmin, getAllBlogsAdmin, deleteCommentById, approveCommentById, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

// Create a router for admin routes
const admintRouter = express.Router();

admintRouter.post('/login', adminLogin);
admintRouter.get('/comments', auth, getAllCommentsAdmin);
admintRouter.get('/blogs', auth, getAllBlogsAdmin);
admintRouter.post('/delete-comment', auth, deleteCommentById);
admintRouter.post('/approve-comment', auth, approveCommentById);
admintRouter.get('/dashboard', auth, getDashboard);

export default admintRouter;