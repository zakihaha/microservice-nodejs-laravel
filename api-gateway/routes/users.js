var express = require('express');
var router = express.Router();

const usersHandler = require('./handler/users');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.get('/', verifyToken, usersHandler.getUser);
router.put('/', verifyToken, usersHandler.update);
router.post('/logout', verifyToken, usersHandler.logout);

module.exports = router;
