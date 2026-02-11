import express from "express";
import { getImageKitAuth } from "../controllers/imagekitController.js";

const imageKitRouter = express.Router();

// Route to get ImageKit authentication parameters
imageKitRouter.get("/auth", getImageKitAuth);

export default imageKitRouter;
