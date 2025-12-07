import jwt from 'jsonwebtoken';

// Middleware to authenticate requests using JWT
const auth = (req, res, next) => {

    // Get token from Authorization header
    const token = req.header('Authorization');

    // If no token, deny access
    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.json({ success: false, message: "Unauthorized Access!" });
    }
}

export default auth;