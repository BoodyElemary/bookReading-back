const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { uploadProfile } = require('../middlewares/upload');

//get all users
router.get('/', userController.getAll);

//get single user
router.get('/:id', userController.getOne);

//add user
router.post('/', uploadProfile.single('Image'), userController.addOne);

// delete user
router.delete('/:id', userController.deleteOne);

//edit user
router.put('/:id', uploadProfile.single('Image'), userController.editOne);

module.exports = router;
