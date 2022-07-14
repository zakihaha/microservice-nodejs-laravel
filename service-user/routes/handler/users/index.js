const getUsers = require('./getUsers')
const getUser = require('./getUser')
const update = require('./update')
const register = require('./register')
const login = require('./login')
const logout = require('./logout')

module.exports = { register, login, logout, update, getUsers, getUser }