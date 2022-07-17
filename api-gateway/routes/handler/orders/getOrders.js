const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_PAYMENT } = process.env

const api = apiAdapter(URL_SERVICE_PAYMENT)

module.exports = async (req, res) => {
    try {
        const userId = req.user.data.id
        const orders = await api.get('/api/orders', {
            params: { userId: userId }
        })
        return res.json(orders.data)
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