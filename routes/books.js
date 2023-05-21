const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { uploadCover } = require('../middlewares/upload');
const auth = require("./../middlewares/authentication");
// Get All books
router.get('/', bookController.getAll);

// Get one book
router.get('/:id', bookController.getOne);

// add one book
router.post('/', auth.adminIsLogin, uploadCover.single('cover'), bookController.addOne);

// update one book
router.put('/:id', auth.adminIsLogin, uploadCover.single('cover'), bookController.editOne);

// delete one book
router.delete('/:id', auth.adminIsLogin, bookController.deleteOne);

module.exports = router;
