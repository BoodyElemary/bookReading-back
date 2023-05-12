const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Get All Books
router.get("/", bookController.getAll);

// Get one book
router.get("/:id", bookController.getOne);

// Post one Book
router.post("/", bookController.addOne);

module.exports = router;
