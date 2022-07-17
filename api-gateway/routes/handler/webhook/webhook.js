const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_PAYMENT } = process.env

const api = apiAdapter(URL_SERVICE_PAYMENT)

module.exports = async (req, res) => {
    try {
        const webhook = await api.post('/api/webhook', req.body)
        return res.json(webhook.data)
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