const express = require('express');
const router = express.Router({mergeParams:true});
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const { uploadCover } = require('../middlewares/upload');
const auth = require("./../middlewares/authentication");
// Get All books
router.get('/', bookController.getAll);

// get most popular books
router.get("/mostPopular", userController.popularBook);

// Get one book
router.get('/:id', bookController.getOne);

// add one book
router.post('/', auth.adminIsLogin, uploadCover.single('cover'), bookController.addOne);

// update one book
router.put('/:id', auth.adminIsLogin, uploadCover.single('cover'), bookController.editOne);

// delete one book
router.delete('/:id', auth.adminIsLogin, bookController.deleteOne);

// add review
router.post('/:id/addReview', auth.isLogin, bookController.addReview);

// edit review
router.put('/:id/editReview/:reviewId', auth.isLogin, bookController.editReview);

// delete review
router.delete('/:id/deleteReview/:reviewId', auth.isLogin, bookController.deleteReview);

// edit rate
router.put('/:id/editRate/:rateId', auth.isLogin, bookController.editRate);

module.exports = router;
