const express = require('express');

const UserModel = require('../model/user');

const router = express.Router();
//get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

//get single user

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//add user

router.post('/', async (req, res) => {
  try {
    const user = await UserModel(req.body);
    user.save();
    res.json('the user has been  created successfully');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
