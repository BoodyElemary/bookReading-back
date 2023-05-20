const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

const getAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      res.status(404).json('no such user');
    }
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const addOne = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profileImg = req.file;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'Profile image is required.' });
    }

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password,
      Image: profileImg.path,
    });
    await user.save();
    res.json('User Created Successfully');
  } catch (error) {
    console.log(error);
  }
};

const editOne = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profileImg = req.file;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'Profile image is required.' });
    }
    const userId = req.params.id;
    const user = await UserModel.findOneAndUpdate(
      userId,
      {
        $set: { firstName, lastName, email, password, Image: profileImg.path },
      },
      { new: true },
      res.json('user was updated succesffuly'),
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete({ _id: id });
    res.json('User Deleted Successfully');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'the user was not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

// addbooksReads to the user

const addBookToUser = async (req, res) => {
  const { book, status } = req.body;
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found.' });
    }

    const newBook = {
      book: book,
      status: status,
    };

    user.userBooks.push(newBook);
    await user.save();

    return res.json({
      success: true,
      message: 'Book added to userBooks array successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while adding the book to userBooks array.',
    });
  }
};

//updateBookStatus
const editBookStatus = async (req, res) => {
  const { bookId, status } = req.body;
  const userId = req.params.id;
  res.json(userId);

  // try {
  //   const user = await UserModel.findById(userId);
  //   if (!user) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: 'User not found.' });
  //   }

  //   const bookIndex = user.userBooks.findIndex(
  //     (book) => book._id.toString() === bookId,
  //   );
  //   if (bookIndex === -1) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: 'Book not found.' });
  //   }

  //   user.userBooks[bookIndex].status = status;
  //   await user.save();

  //   return res.json({
  //     success: true,
  //     message: 'Book status updated successfully.',
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: 'An error occurred while updating the book status.',
  //   });
  // }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  editOne,
  addBookToUser,
  editBookStatus,
};
