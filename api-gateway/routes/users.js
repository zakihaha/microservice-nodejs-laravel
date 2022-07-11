var express = require('express');
var router = express.Router();

const usersHandler = require('./handler/users');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.put('/', verifyToken, usersHandler.update);

module.exports = router;
