const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const auth = require("./../middlewares/authentication");
// Get All categorys
router.get("/", categoryController.getAll);

// Get one category
router.get("/:id", categoryController.getOne);

// Post one category
router.post("/", auth.adminIsLogin, categoryController.addOne);

// update one category
router.put("/:id", auth.adminIsLogin, categoryController.editOne);

// delete one category
router.delete("/:id", auth.adminIsLogin, categoryController.deleteOne);

module.exports = router;
