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
const auth = require("./../middlewares/authentication");

Router.use("/login", authenticationRoute);
express().use(authMW);
Router.use("/authors",auth.isLogin, authorsRouter);
Router.use("/users", usersRouter);
Router.use("/books",auth.isLogin, booksRouter);
Router.use("/categories", auth.isLogin, categoriesRouter);

module.exports = Router;
