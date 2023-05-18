const BooksModel = require('../model/books');
const CategoriesModel = require('../model/categories');
const AuthorsModel = require('../model/authors');
const fs = require('fs');
const { error } = require('console');

const getAll = async (req, res, next) => {
  try {
    const books = await BooksModel.find({}, { __v: 0 })
      .populate('category')
      .populate('author')
      .populate('user_review.userID', { email: 0, password: 0, __v: 0 });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const book = await BooksModel.findById({ _id: bookID }, { __v: 0 })
      .populate('category')
      .populate('author')
      .populate('user_review.userID', { email: 0, password: 0, __v: 0 });
    if (book) {
      res.json({ Book: book });
    } else {
      res.satatus(404).json({ message: "This Book Doesn't exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addOne = async (req, res) => {
  try {
    const { bookName, rate, category, author, user_review } = req.body;
    const coverImg = req.file;
    if (!req.file) {
      res.status(404).json('please upload a book cover');
    }

    // const book = await BooksModel(req.body);
    const book = new BooksModel({
      bookName,
      rate,
      category,
      author,
      user_review,
      cover: coverImg.path,
    });

    await CategoriesModel.findByIdAndUpdate(category, {
      $push: { books: book._id },
    });
    await AuthorsModel.findByIdAndUpdate(author, {
      $push: { books: book._id },
    });
    await book.save();
    res.json({ success: true, data: book, message: 'Book added successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};
//todo fix the edit one method
const editOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const { bookName, rate, category, author, user_review } = req.body;
    const coverImg = req.file;
    if (!req.file) {
      res.status(404).json('please upload a book cover');
    }

    const bookCoverPath = await BooksModel.findById(bookID, {
      cover: true,
      _id: false,
    });
    fs.unlink(bookCoverPath.cover, (error) => {
      if (error) {
        console.log(error);
        return;
      }
    });

    const book = await BooksModel.findByIdAndUpdate(
      bookID,
      {
        $set: { bookName, rate, category, author, user_review },
        cover: coverImg.path,
      },
      { new: true },
    );
    res.json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const bookCoverPath = await BooksModel.findById(bookID, {
      cover: true,
      _id: false,
    });
    fs.unlink(bookCoverPath.cover, (error) => {
      if (error) {
        console.log(error);
        return;
      }
    });
    const book = await BooksModel.findByIdAndDelete(bookID);
    res.json({
      success: true,
      message: 'Book Deleted successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAll, getOne, addOne, editOne, deleteOne };
