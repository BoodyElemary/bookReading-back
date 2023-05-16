const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { uploadCover } = require('../middlewares/upload');

// Get All books
router.get('/', bookController.getAll);

// Get one book
router.get('/:id', bookController.getOne);

// add one book
router.post('/', uploadCover.single('cover'), bookController.addOne);

// update one book
router.put('/:id', uploadCover.single('cover'), bookController.editOne);

// delete one book
router.delete('/:id', bookController.deleteOne);

module.exports = router;
