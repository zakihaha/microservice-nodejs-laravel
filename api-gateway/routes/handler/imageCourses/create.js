const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_COURSE } = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

module.exports = async (req, res) => {
    try {
        const imageCourse = await api.post('/api/image-courses', req.body)
        return res.json(imageCourse.data)
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