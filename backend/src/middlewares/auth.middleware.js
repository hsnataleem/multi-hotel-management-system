const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        //read authentication header
        const authHeader = req.headers.authorization;

        //check if header exists
        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing",
            });
        }

    //extract bearer token
    const token = authHeader.split(" ")[1];
     //verify jwt

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     // attach decoded payload to req.user

     req.user = decoded;

     // continue to next middleware/route
     next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, invalid token",
        });
    }
};

module.exports = { protect };