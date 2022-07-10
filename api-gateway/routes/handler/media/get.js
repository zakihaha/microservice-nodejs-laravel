const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_MEDIA } = process.env

const api = apiAdapter(URL_SERVICE_MEDIA)

module.exports = async (req, res) => {
    try {
        const medias = await api.get('/')
        return res.json(medias.data)
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