const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { uploadUserProfile } = require("../middlewares/upload");
const auth = require("./../middlewares/authentication");

//get all users
router.get("/", auth.adminIsLogin, userController.getAll);


//get single user
router.get("/profile",  auth.isLogin, userController.getOne);

//add user
router.post("/", uploadUserProfile.single("Image"), userController.addOne);

//addBookToUser
router.post("/addBookToUser", auth.isLogin, userController.addBookToUser);

//editbookStatus
router.put("/editBookStatus", auth.isLogin, userController.editBookStatus);

//remove book from user
router.delete("/removeBook", auth.isLogin, userController.removeBookFromUser);

//edit user
router.put('/profile', auth.isLogin, uploadUserProfile.single("Image"), userController.editOne);

// delete user
router.delete('/profile', auth.isLogin, userController.deleteOne);

module.exports = router;
