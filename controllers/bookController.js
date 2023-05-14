const BooksModel = require("../model/books")
const CategoriesModel = require("../model/categories")
const AuthorsModel = require("../model/authors")

const getAll = async (req, res) => {
  try {
    const books = await BooksModel.find({}, { __v: 0 })
    .populate("category")
    .populate("author")
    .populate("user_review.userID",{email: 0, password: 0, __v: 0})
    res.json(books);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const book = await BooksModel.findById({ _id: bookID })
    .populate("category")
    .populate("author")
    .populate("user_review.userID",{email: 0, password: 0, __v: 0})
    if (book){
      res.json({"Book": book});
    }
    else{
      res.satatus(404).json({"message": "This Book Doesn't exist"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addOne = async (req, res) => {
  try {
    const book = await BooksModel(req.body);
    await CategoriesModel.findByIdAndUpdate(req.body.category, { $push: { books: book._id }})
    await AuthorsModel.findByIdAndUpdate(req.body.author, { $push: { books: book._id }})
    await book.save();
    res.json({"success":true, "data": book,"message":"Book added successfully"});
  } catch (error) {
    res.status(500).json(error);
  }
};


const editOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const book = await BooksModel.findByIdAndUpdate(bookID, {$set: req.body}, {new: true});
    res.json({"success":true, "message":"Book updated successfully", "data": book});
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const book = await BooksModel.findByIdAndDelete(bookID);
    res.json({"success":true, "message":"Book Deleted successfully", "data": book});
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = { getAll, getOne, addOne, editOne, deleteOne };
