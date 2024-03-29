const jwt = require('jsonwebtoken');
const apiAdapter = require('../../apiAdapter');
const { URL_SERVICE_USER, JWT_SECRET, JWT_SECRET_REFRESH_TOKEN, JWT_ACCESS_TOKEN_EXPIRED } = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        const refreshToken = req.body.refresh_token;
        const email = req.body.email;

        if (!refreshToken || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid token'
            });
        }

        await api.get('/refresh_tokens', { params: { refresh_token: refreshToken } });

        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            console.log('refreshToken', refreshToken);
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    message: err.message,
                });
            }

            // check if email is the same
            if (decoded.data.email !== email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid email'
                });
            }

            const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });

            return res.status(200).json({
                status: 'success',
                data: { token }
            });
        });

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                status: 'error',
                message: 'Service unavailable'
            })
        }
        return res.status(error.response.status).json(error.response.data);
    }
}