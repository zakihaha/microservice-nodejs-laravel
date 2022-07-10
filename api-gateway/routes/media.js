const express = require('express');
const router = express.Router();

const mediaHandler = require('./handler/media');

router.get('/', mediaHandler.get);
router.post('/', mediaHandler.create);
router.delete('/:id', mediaHandler.deleteMedia);

module.exports = router;
