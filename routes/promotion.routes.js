const express = require('express');
const promotionController = require("../controllers/promotion.controller");
const router = express.Router();


router.post('/add', promotionController.addPromotion);
router.get('/get', promotionController.getPromotions);
router.get('/get/:id', promotionController.getPromotionsbyId);
router.get('/get/name/:name', promotionController.getPromotionsbyName);
router.get('/get/type/:type', promotionController.getPromotionsbyType);
router.get('/get/startDate/:date', promotionController.getPromotionsbyStartDate);
router.get('/get/endDate/:date', promotionController.getPromotionsbyEndDate);
router.put('/replace/:id', promotionController.replacePromotion);
router.patch('/update/:id', promotionController.updatePromotion);
router.delete('/delete/:id', promotionController.deletePromotion);

module.exports = router;

