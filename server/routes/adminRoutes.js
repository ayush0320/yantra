import express from 'express';
import { adminLogin } from '../controllers/adminController.js';

// Create a router for admin routes
const admintRouter = express.Router();

admintRouter.post('/login', adminLogin);

export default admintRouter;