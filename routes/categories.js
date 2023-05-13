const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Get All categorys
router.get("/", categoryController.getAll);

// Get one category
router.get("/:id", categoryController.getOne);

// Post one category
router.post("/", categoryController.addOne);

// update one category
router.put("/:id", categoryController.editOne);

// delete one category
router.delete("/:id", categoryController.deleteOne);

module.exports = router;
