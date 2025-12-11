import jwt from 'jsonwebtoken';

// Middleware to authenticate requests using JWT
const auth = (req, res, next) => {

    // Get token from Authorization header
    const authHeader = req.header('Authorization');

    if(!authHeader) {
        return res.json({ success: false, message: "Access Denied. No token provided." });
    }
    
    // Extract token by removing 'Bearer ' prefix
    const token = authHeader.replace('Bearer ', '');

    // If no token, deny access
    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.json({ success: false, message: "Unauthorized Access!" });
    }
}

export default auth;