const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_COURSE } = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

module.exports = async (req, res) => {
    try {
        const { id } = req.params
        const mentor = await api.put(`/api/courses/${id}`, req.body)
        return res.json(mentor.data)
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