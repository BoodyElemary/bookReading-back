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

module.exports = { getAll, getOne, addOne, deleteOne, editOne };
