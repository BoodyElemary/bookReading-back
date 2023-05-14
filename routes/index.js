const express = require("express");
const Router = express.Router();
require("../model/user");
require("../model/books");
const usersRouter = require("./users");
const booksRouter = require("./books");
const categoriesRouter = require("./categories");
const authorsRouter = require("./authors");

Router.use("/users", usersRouter);
Router.use("/books", booksRouter);
Router.use("/categories", categoriesRouter);
Router.use("/authors", authorsRouter);

module.exports = Router;
