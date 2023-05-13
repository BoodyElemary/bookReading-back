const express = require("express");
const Router = express.Router();
require("../model/user");
require("../model/books");
const usersRouter = require("./users");
const booksRouter = require("./books");
const categoriesRouter = require("./categories");

Router.use("/users", usersRouter);
Router.use("/books", booksRouter);
Router.use("/categories", categoriesRouter);

module.exports = Router;
