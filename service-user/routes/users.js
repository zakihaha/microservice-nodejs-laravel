const express = require('express');
const router = express.Router();

const usersHandler = require('./handler/users');

router.get('/', usersHandler.getUsers);
router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.put('/:id', usersHandler.update);

module.exports = router;
