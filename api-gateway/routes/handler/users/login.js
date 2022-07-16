const jwt = require('jsonwebtoken');

const apiAdapter = require('../../apiAdapter');
const { URL_SERVICE_USER, JWT_SECRET, JWT_SECRET_REFRESH_TOKEN, JWT_ACCESS_TOKEN_EXPIRED, JWT_REFRESH_TOKEN_EXPIRED } = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        // send login request
        const user = await api.post('/users/login', req.body);
        const data = user.data.data

        // create access token
        const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
        // create refresh token
        const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

        // store refresh token in database
        await api.post('/refresh_tokens', { refresh_token: refreshToken, user_id: data.id });

        return res.json({
            status: 'success',
            data: {
                token,
                refreshToken,
            }
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