const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication.controller.js');

// user login
router.post('/', authenticationController.login);

// admin login
router.post('/admin', authenticationController.loginAdmin);

module.exports = router;
