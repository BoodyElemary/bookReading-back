const BooksModel = require("../model/books");
const CategoriesModel = require("../model/categories");
const AuthorsModel = require("../model/authors");
const UserModel = require("../model/user");
const relationsHandler = require("./relationsController")
const fs = require("fs");

const getAll = async (req, res, next) => {
  try {
    const books = await BooksModel.find({}, { __v: 0 })
    .populate('category', {books: 0, __v:0})
    .populate('author', {books: 0, dateOfBirth: 0,  __v:0})
    .populate("user_review.userID", { email: 0, password: 0, __v: 0 });
    return res.json({success: true, data: books, message: "all books data are retrieved"});
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

const getOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const book = await BooksModel.findById({ _id: bookID }, { __v: 0 })
    .populate('category', {books: 0, __v:0})
    .populate('author', {books: 0, dateOfBirth: 0,  __v:0})
      .populate("user_review.userID", { email: 0, password: 0, __v: 0 });
    if (book) {
      return res.json({ success: true, data: book, message: "book data is retrieved" });
    } else {
      return res.status(404).json({ success: false, message: "This Book Doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

const addOne = async (req, res) => {
  try {
    const { bookName, rate, category, author, user_review } = req.body;
    const coverImg = req.file;
    if (!req.file) {
      return res.status(404).json({success: false, message: "please upload a book cover"});
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
    return res.json({ success: true, data: book, message: "Book added successfully" });
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

//todo fix the edit one method
const editOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const { bookName, rate, category, author, user_review } = req.body;
    const coverImg = req.file;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Cover image is required." });
    }
    const bookCoverPath = await BooksModel.findById(bookID, {
      cover: true
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
      { new: true }
    );
    return res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

const deleteOne = async (req, res) => {
  try {
    const bookID = req.params.id;
    const existBook = await BooksModel.findById(bookID, {
      cover: true,
      _id: true,
    });

    if(existBook){

      let userDeleted = relationsHandler.deleteBookFromUsers(existBook._id)
      let authorDeleted = relationsHandler.deleteBookFromAuthors(existBook._id)
      let bookDeleted = relationsHandler.deleteBookFromCategories(existBook._id)
      if (userDeleted && authorDeleted && bookDeleted){
        fs.unlink(existBook.cover, (error) => {
          if (error) {
            return res.status(500).json({"success": false, "message": error.message});
          }
        });

        await existBook.deleteOne()
        // await existBook.remove()
        return res.json({
          success: true,
          message: "Book Deleted successfully",
          data: existBook,
        });

      }else{
        return res.json({
          success: false,
          message: "error in deleting the book",
        });
      }

    }
    else{
      return res.json({
        success: false,
        message: "Book doesn't Exist",
      });
    }
    // const book = await BooksModel.findById(bookID);



  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

const addReview = async (req, res) =>{
  try{
    const bookID = req.params.id;
    const userID = req.userId;
    const review = req.body.review;
    let book = await BooksModel.findByIdAndUpdate(bookID, {
      $push: { user_review: {userID, review} }
    }, { new: true });

    // return res.json({user: userID})
    return res.json({
      success: true,
      message: "review saved Successfully",
      data: book,
    });
  }
  catch(error){
    return res.status(500).json({"success": false, "message": error.message});
  }


}

const editReview = async (req, res) =>{
  try{
    const bookID = req.params.id;
    const reviewId = req.params.reviewId;
    const userID = req.userId;
    const newReview = req.body.review;

    let book = await BooksModel.findOneAndUpdate(
      {_id: bookID, 'user_review._id': reviewId, 'user_review.userID': userID },
    { $set: {'user_review.$.review': newReview} }, { new: true });

    return res.json({
      success: true,
      message: "review edit Successfully",
      data: book,
    });
  }
  catch(error){
    return res.status(500).json({"success": false, "message": error.message});
  }


}

const deleteReview = async (req, res) =>{
  try{
    const bookID = req.params.id;
    const reviewId = req.params.reviewId;
    const userID = req.userId;

    let book = await BooksModel.findOneAndUpdate(
      {_id: bookID, 'user_review._id': reviewId, 'user_review.userID': userID },
    { $pull: { 'user_review': { _id: reviewId } } }, { new: true });

    return res.json({
      success: true,
      message: "review deleted Successfully",
      data: book,
    });
  }
  catch(error){
    return res.status(500).json({"success": false, "message": error.message});
  }


}

const editRate = async (req, res) =>{
  try{
    const bookID = req.params.id;
    const rateId = req.params.rateId;
    const userID = req.userId;
    const newRate = req.body.rate;

    let book = await BooksModel.findOneAndUpdate(
      {_id: bookID, 'user_rate._id': rateId, 'user_rate.userID': userID },
    { $set: {'user_rate.$.rate': newRate} }, { new: true });

    return res.json({
      success: true,
      message: "rate edited Successfully",
      data: book,
    });
  }
  catch(error){
    return res.status(500).json({"success": false, "message": error.message});
  }


}





module.exports = { getAll, getOne, addOne, editOne, deleteOne, addReview, editReview, deleteReview, editRate};
