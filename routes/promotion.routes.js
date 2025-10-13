const express = require('express');
const promotionController = require("../controllers/promotion.controller");
const router = express.Router();
const upload = require("../middleware/upload");

const multer = require('multer');
router.post('/add', upload.single('icon'), promotionController.addPromotion);
router.get('/get', promotionController.getPromotion);
router.get('/get/:id', promotionController.getPromotionbyId);
router.get('/get/name/:name', promotionController.getPromotionbyName);
router.get('/get/endDate/:date', promotionController.getPromotionbyEndDate);
router.patch('/update/:id', upload.single('icon'), promotionController.updatePromotion);
router.delete('/delete/:id', promotionController.deletePromotion);


module.exports = router;


