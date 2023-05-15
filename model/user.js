const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    message: 'The First Name is Required',
  },
  lastName: {
    type: String,
    required: true,
    message: 'The Last Name is Required',
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (email) => {
        const regex =
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
      },
      message: 'Invalid E-mail Address',
    },
    required: true,
    messageType: 'E-mail is Required ',
  },
  password: String,
  Image: String,
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
