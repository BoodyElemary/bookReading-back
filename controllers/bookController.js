const mongoose = require("mongoose");
const BooksModel = mongoose.model("Book");

const getAll = async (req, res) => {
  try {
    const books = await BooksModel.find({}, { __v: 0 }).populate(
      "user_review.userID",
      {
        email: 0,
        password: 0,
        __v: 0,
      }
    );
    res.json(books);
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const book = await BooksModel.findById({ _id: bookID });
    res.json(book);
  } catch (error) {
    console.log(error);
  }
};

const addOne = async (req, res) => {
  try {
    const book = await BooksModel(req.body);
    await book.save();
    res.json("book added successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAll, getOne, addOne };
