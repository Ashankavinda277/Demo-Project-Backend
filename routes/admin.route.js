const express = require('express');

const adminController = require("../controllers/admin.controller");

const router = express.Router();


router.post('/add', adminController.createAdmin);
router.get('/viewAll', adminController.viewAllAdmins);
router.get('/view/:id', adminController.viewAdminById);
router.get('/view/:username', adminController.viewAdminByUsername);
router.get('/view/:email', adminController.viewAdminByEmail);
router.get('/view/:address', adminController.viewAdminByAddress);
router.patch('/update/:id', adminController.updateAdmin);
router.delete('/delete/:id', adminController.deleteAdmin);


module.exports = router;