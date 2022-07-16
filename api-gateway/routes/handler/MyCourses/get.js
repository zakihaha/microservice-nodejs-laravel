const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_COURSE } = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

module.exports = async (req, res) => {
    try {
        const userId = req.user.data.id
        const myCourses = await api.get(`/api/my-courses/`, {
            params: { user_id: userId }
        })
        return res.json(myCourses.data)
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