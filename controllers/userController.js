const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const BooksModel = require("../model/books");
const fs = require("fs");

const getAll = async (req, res) => {
  try {
    const users = await UserModel.find()
    .populate("userBooks.book", {category: 0, author: 0, __v: 0, user_review: 0, user_rate: 0});
    return res.json({success: true, data: users, message: "all users data are retrieved"});
  } catch (error) {
    return res.status(500).json({"success": false, "massage": error.message});
  }
};

const getOne = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById({ _id: userId })
    .populate({
      path: 'userBooks.book',
      select: '-category -author -user_review -__v',
      populate: {
        path: 'user_rate',
        match: { userID: userId },
      },
    });
    if (!user) {
      return res.status(404).json({success: false, message: "no such user"});
    }
    res.json({success: true, data: user, message: "retrieved all user data"});
  } catch (error) {
     return res.status(500).json({"success": false, "massage": error.message});
  }


};

const addOne = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profileImg = req.file;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Profile image is required." });
    }

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password,
      Image: profileImg.path,
    });

    await user.save();
    return res.json({success: true, data: user, message: "User Created Successfully"});
  } catch (error) {
    return res.status(500).json({"success": false, "massage": error.message});
  }
};

const editOne = async (req, res) => {
  try {
    const userID = req.userId;
    const {firstName, lastName, email, password} = req.body
    const profileImg = req.file;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Profile image is required." });
    }
    const userImagePath = await UserModel.findById(userID, {
      Image: true
    });
    fs.unlink(userImagePath.Image, (error) => {
      if (error) {
        return res.status(500).json({"success": false, "massage": error.message});
      }
    });
    const user = await UserModel.findByIdAndUpdate(userID, {$set: {lastName, firstName,  email, password}, Image: profileImg.path}, {new: true});
    return res.json({"success": true, "message":"profile updated successfully", "data": user});
  } catch (error) {
    return res.status(500).json({"success": false, "massage": error.message});
  }
};

const deleteOne = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "the user was not found" });
    }
    const userImagePath = await UserModel.findById(userId, {
      Image: true
    });
    fs.unlink(userImagePath.Image, (error) => {
      if (error) {
        return res.status(500).json({"success": false, "massage": error.message});
      }
    });
    res.json({success: true, message: "User Deleted Successfully", data: user});
  } catch (error) {
     return res.status(500).json({"success": false, "massage": error.message});
  }
};

// addbooksReads to the user

const addBookToUser = async (req, res) => {
  const { book, status } = req.body;
  const userID = req.userId;
  try {
    const user = await UserModel.findByIdAndUpdate(userID,
      {$push: {userBooks: {book, status}}},  { new: true })
      .populate({
        path: 'userBooks.book',
        select: '-category -author -user_review -__v',
        populate: {
          path: 'user_rate',
          match: { userID: userID },
        },
      });;
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    let editBook = await BooksModel.findByIdAndUpdate(book, {
      $push: { user_rate: {userID, rate:0} }
    }, { new: true });
    return res.json({success: true, message: "Book added to userBooks array successfully.", data: user});
  } catch (error) {
    return res.status(500).json({ success: false,message: "An error occurred while adding the book to userBooks array."});
  }
};

//updateBookStatus
const editBookStatus = async (req, res) => {
  const { book, status } = req.body;
  const userId = req.userId;
  // res.json(status);

  try {
    let existUser = await UserModel.findOneAndUpdate(
      {_id: userId, 'userBooks.book': book},
      { $set: {'userBooks.$.status': status} }, { new: true });

    return res.json({
      success: true,
      message: "Book status updated successfully",
      data: existUser,
    });
  } catch (error) {
    return res.status(500).json({"success": false, "massage": error.message});
  }
};

const removeBookFromUser = async (req, res) => {
  const book = req.body.book;
  const userId = req.userId;

  try {

    let existUser = await UserModel.findOneAndUpdate(
      {_id: userId, 'userBooks.book': book},
      { $pull: {'userBooks': {book: book}} }, { new: true });

    return res.json({
      success: true,
      message: "Book removed from userBooks array successfully.",
      data : existUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const popularBook = async(req, res) => {

// Find all users and aggregate their books
UserModel.aggregate([
  // Unwind the userBooks array to get individual book documents
  { $unwind: '$userBooks' },
  // Group the books by their ID and count the occurrences
  { $group: { _id: '$userBooks.book', count: { $sum: 1 } } },
  // Sort the books in descending order based on the count
  { $sort: { count: -1 } },
  // Limit the result to the top 5 books
  { $limit: 5 },
])
  .then((result) => {
    // Extract the book IDs from the result
    const bookIds = result.map((entry) => entry._id);

    // Retrieve the book details using the IDs
    BooksModel.find({ _id: { $in: bookIds } })
    .populate('category', {books: 0, __v:0})
    .populate('author', {books: 0, dateOfBirth: 0,  __v:0})
      .then((books) => {
        res.json({success: true, "data": books, message: "the most populate books"});
      })
      .catch((error) => {
        return res.status(500).json({success: false, message: error.message});
      });
  })
  .catch((error) => {
    return res.status(500).json({success: false, message: error.message});
  });
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  editOne,
  addBookToUser,
  editBookStatus,
  removeBookFromUser,
  popularBook
};

