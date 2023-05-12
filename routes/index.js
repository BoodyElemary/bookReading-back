const express = require("express");
const Router = express.Router();
require("../model/user");
require("../model/books");
const usersRouter = require("./users");
const booksRouter = require("./books");

Router.use("/users", usersRouter);
Router.use("/books", booksRouter);

module.exports = Router;
