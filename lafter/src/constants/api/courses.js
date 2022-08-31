import axios from 'src/configs/axios'

export default {
    all: (options = { params: { status: "published" } }) => axios.get('/courses', options).then(res => res.data),
    detail: (id) => axios.get(`/courses/${id}`).then(res => res.data),
}