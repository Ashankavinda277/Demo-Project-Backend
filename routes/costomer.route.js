const express = require('express');
const customerController = require("../controllers/custormer.controller");

const router = express.Router();
router.post('/add', customerController.addCustomer);
router.get('/get', customerController.getcustomer);
router.get('/get/:id', customerController.getcustomerbyID);
router.get('/get/name/:name', customerController.getcustomerbyName);
router.get('/get/email/:email', customerController.getcustomerbyEmail);
router.get('/replace/:id',customerController.replaceCustomer);
router.put('/update/:id', customerController.updateCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);

module.exports = router;