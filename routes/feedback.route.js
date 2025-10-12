const express = require('express');
const feedbackController = require('../controllers/feedback.controller');
const router = express.Router();

router.post('/add', feedbackController.addFeedback);
router.get('/showAll', feedbackController.showFeedback);
router.get('/showByDate/:date', feedbackController.showFeedbackByDate);

module.exports = router;


