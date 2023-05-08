const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    message: 'the firstName is required',
  },
  lastName: {
    type: String,
    required: true,
    message: 'the lastName is required',
  },
  email: {
    type: String,
    validate: {
      validator: (email) => {
        const regex =
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
      },
      message: 'Invalid email address',
    },
    required: true,
    messageType: 'email is required ',
  },
  password: String,
  Image: String,
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
