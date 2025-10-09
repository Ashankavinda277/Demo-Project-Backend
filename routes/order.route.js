const express = require('express');

const orderController = require("../controllers/order.controller");
const router = express.Router();

router.post('/place', orderController.placeOrder);
router.get('/viewAll', orderController.viewAllOrders);
router.get('/view/:id', orderController.viewByOrderId);
router.get('/view/:customerId', orderController.viewByCustomerId);
router.get('/view/:productId', orderController.viewByProductId);
router.get('/view/:status', orderController.viewByStatus);
router.patch('/update/:id', orderController.updateOrderStatus);
router.delete('/delete/:id', orderController.deleteOrder);

module.exports = router;