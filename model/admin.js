const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (email) => {
        const regex =
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
      },
      message: "Invalid E-mail Address",
    },
    required: true,
    messageType: "E-mail is Required ",
  },
  password: {
    type: String,
    required: true,
    message: "The password is Required",
  },
});

const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;
