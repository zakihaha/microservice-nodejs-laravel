var express = require('express');
var router = express.Router();

const ordersHandler = require('./handler/orders');

router.get('/', ordersHandler.getOrders);
router.post('/', ordersHandler.createOrder);

module.exports = router;
