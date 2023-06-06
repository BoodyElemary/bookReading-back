const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication.controller.js');

// user login
router.post('/user/login', authenticationController.login);

// admin login
router.post('/admin/login', authenticationController.loginAdmin);

// admin register
router.post('/admin/register', authenticationController.registerAdmin);

module.exports = router;
