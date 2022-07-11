const express = require('express');
const router = express.Router();

const refreshTokensHandler = require('./handler/refreshTokens');

router.get('/', refreshTokensHandler.getToken);
router.post('/', refreshTokensHandler.create);

module.exports = router;