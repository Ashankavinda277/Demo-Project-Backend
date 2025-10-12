const express = require('express');
const promotionController = require("../controllers/promotion.controller");
const router = express.Router();


router.post('/add', promotionController.addPromotion);
router.get('/get', promotionController.getPromotion);
router.get('/get/:id', promotionController.getPromotionbyId);
router.get('/get/name/:name', promotionController.getPromotionbyName);
// router.get('/get/type/:type', promotionController.getPromotionbyType);
// router.get('/get/startDate/:date', promotionController.getPromotionbyStartDate);
router.get('/get/endDate/:date', promotionController.getPromotionbyEndDate);
// router.put('/replace/:id', promotionController.replacePromotion);
router.patch('/update/:id', promotionController.updatePromotion);
router.delete('/delete/:id', promotionController.deletePromotion);

module.exports = router;

