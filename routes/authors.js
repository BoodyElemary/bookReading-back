const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const auth = require("./../middlewares/authentication");

// Get All authors
router.get("/", authorController.getAll);

// Get one author
router.get("/:id", authorController.getOne);

// Post one author
router.post("/", auth.adminIsLogin, authorController.addOne);

// update one author
router.put("/:id", auth.adminIsLogin, authorController.editOne);

// delete one author
router.delete("/:id", auth.adminIsLogin, authorController.deleteOne);

module.exports = router;
