var express = require('express');
var router = express.Router();
const { APP_NAME } = process.env

router.get('/', function (req, res, next) {
  res.send('COURSE');
});

module.exports = router;
