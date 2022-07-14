const express = require('express');
const router = express.Router();

const usersHandler = require('./handler/users');

router.get('/', usersHandler.getUsers);
router.get('/:id', usersHandler.getUser);
router.put('/:id', usersHandler.update);
router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.post('/logout', usersHandler.logout);

module.exports = router;
