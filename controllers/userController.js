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
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const addOne = async (req, res) => {
  try {
    const user = await UserModel(req.body);
    await user.save();
    res.json('User Created Successfully');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAll, getOne, addOne };
