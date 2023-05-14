const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// Get All authors
router.get("/", authorController.getAll);

// Get one author
router.get("/:id", authorController.getOne);

// Post one author
router.post("/", authorController.addOne);

// update one author
router.put("/:id", authorController.editOne);

// delete one author
router.delete("/:id", authorController.deleteOne);

module.exports = router;
