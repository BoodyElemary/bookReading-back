const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Get All books
router.get("/", bookController.getAll);

// Get one book
router.get("/:id", bookController.getOne);

// Post one book
router.post("/", bookController.addOne);

// update one book
router.put("/:id", bookController.editOne);

// delete one book
router.delete("/:id", bookController.deleteOne);


module.exports = router;
