const express = require('express');
const router = express.Router();
const {makeOrder ,getOrderById, deleteOrder, getAllOrders } = require('../controllers/OrderController');

router.post('/',makeOrder);
router.get('/:orderId', getOrderById);
router.get('/', getAllOrders);
router.delete('/:orderId', deleteOrder);

module.exports = router;
