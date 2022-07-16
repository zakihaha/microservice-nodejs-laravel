const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_COURSE, HOSTNAME } = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

module.exports = async (req, res) => {
    try {
        const courses = await api.get('/api/courses', {
            params: {
                ...req.query
            }
        })

        const coursesData = courses.data
        const firstPage = coursesData.data.first_page_url.split('?').pop()
        const lastPage = coursesData.data.last_page_url.split('?').pop()

        coursesData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`
        coursesData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`

        coursesData.data.path = `${HOSTNAME}/courses`

        if (coursesData.data.next_page_url) {
            const nextPage = coursesData.data.next_page_url.split('?').pop()
            coursesData.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`
        }

        if (coursesData.data.prev_page_url) {
            const prevPage = coursesData.data.prev_page_url.split('?').pop()
            coursesData.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`
        }
        
        coursesData.data.links.map(link => {
            if (link.url !== null) {
                return link.url = `${HOSTNAME}/courses?${link.url.split('?').pop()}`
            }
        })

        return res.json(coursesData)
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