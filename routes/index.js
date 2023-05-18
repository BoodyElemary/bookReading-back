const express = require("express");
const Router = express.Router();
require("../model/user");
require("../model/books");
const usersRouter = require("./users");
const booksRouter = require("./books");
const categoriesRouter = require("./categories");
const authorsRouter = require("./authors");
const authenticationRoute = require("./authentication.routes");
const authMW = require("./../middlewares/auth.mw");

Router.use("/login", authenticationRoute);
express().use(authMW);
Router.use("/authors", authorsRouter);
Router.use("/users", usersRouter);
Router.use("/books", booksRouter);
Router.use("/categories", categoriesRouter);

module.exports = Router;
