import express from "express";
import { getImageKitAuth } from "../controllers/imageController.js";

const imageKitRouter = express.Router();

// Route to get ImageKit authentication parameters
imageKitRouter.get("/auth", getImageKitAuth); // Route to get ImageKit authentication parameters

export default imageKitRouter;
