import jwt from 'jsonwebtoken';

// Middleware to authenticate requests using JWT
const auth = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.header('Authorization');
        
        // If no token, deny access
        if (!authHeader) {
            return res.status(401).json({ 
                success: false, 
                message: "No authorization token provided." 
            });
        }

        // Handle both "Bearer <token>" and raw token formats
        const token = authHeader. startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : authHeader;
        
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET);
        next();
        
    } catch (error) {
        res.status(403).json({ 
            success: false, 
            message: "403 Your account cannot be authenticated." 
        });
    }
}

export default auth;