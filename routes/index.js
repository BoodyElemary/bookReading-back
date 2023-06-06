const express = require("express");
const Router = express.Router();
require("../model/user");
require("../model/books");
const usersRouter = require("./users");
const booksRouter = require("./books");
const categoriesRouter = require("./categories");
const authorsRouter = require("./authors");
const authenticationRoute = require("./authentication.routes");
const app = express()
app.use(express.json())

Router.use("/auth", authenticationRoute);
Router.use("/authors", authorsRouter);
Router.use("/users", usersRouter);
Router.use("/books", booksRouter);
Router.use("/categories", categoriesRouter);

module.exports = Router;
