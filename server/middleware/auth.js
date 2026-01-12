import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        console.log('Auth Header:', authHeader);
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        
        if (!authHeader) {
            return res.status(401).json({ 
                success: false, 
                message: "No authorization token provided." 
            });
        }

        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : authHeader;
        
        // console.log('Token to verify:', token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded token:', decoded);
        
        next();
        
    } catch (error) {
        // console.log('Auth error:', error.message);
        res.status(403).json({ 
            success: false, 
            message: "403 Your account cannot be authenticated." 
        });
    }
}

export default auth;