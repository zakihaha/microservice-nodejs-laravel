const apiAdapter = require('../../apiAdapter')
const { URL_SERVICE_PAYMENT } = process.env

const api = apiAdapter(URL_SERVICE_PAYMENT)

module.exports = async (req, res) => {
    try {
        const user = req.user.data

    } catch (error) {
        
    }
}