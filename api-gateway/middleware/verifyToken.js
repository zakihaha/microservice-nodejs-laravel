const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log("token",req.headers.authorization);
    
    jwt.verify(req.headers.authorization, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: err.message
            })
        }

        // inject user to request object
        req.user = decoded;
        return next();
    });
}