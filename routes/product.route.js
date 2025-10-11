const express = require('express');
const productController = require("../controllers/product.controller");
const router = express.Router();
const upload = require("../middleware/upload");

const multer = require('multer');
router.post('/add', productController.addProduct);
router.get('/get', productController.getProducts);
router.get('/get/:id', productController.getProductsbyID);
router.get('/get/name/:name', productController.getProductsbyName);
router.get('/get/type/:type', productController.getProductsbyType);
router.get('/get/price/:price', productController.getProductsbyPrice);
router.get('/get/weight/:weight', productController.getProductsbyWeight);
router.put('/replace/:id', upload.single('image'), productController.replaceProduct);
router.patch('/update/:id', upload.single('image'), productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;  