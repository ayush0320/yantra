import jwt from 'jsonwebtoken';

// Middleware to authenticate requests using JWT
const auth = (req, res, next) => {

    // Get token from Authorization header
    const authHeader = req.header('Authorization');

    // If no token, deny access
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided - Unauthorized access" });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token - Unauthorized access" });
    }
}

export default auth;