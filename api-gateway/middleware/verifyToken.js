const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiWmFraSBDaG9pcnVkZGluIiwiZW1haWwiOiJ6YWtpQGdtYWlsLmNvbSIsInByb2Zlc3Npb24iOiJTb2Z0d2FyZSBFbmdpbmVlciIsInJvbGUiOiJhZG1pbiIsImF2YXRhciI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbWFnZXMvMTY1NzQ3MTgxODU1Ny5qcGcifSwiaWF0IjoxNjYzMDkyNjA1LCJleHAiOjE2NjMxNzkwMDV9.7cPQ7I7ZQrpkdAIRptMJnMnZK0MJ67rSWHqHY9fcrCM";
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