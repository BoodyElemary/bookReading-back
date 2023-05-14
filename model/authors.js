const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    message: "The First Name is Required",
  },
  lastName: {
    type: String,
    required: true,
    message: "The Last Name is Required",
  },
  dateOfBirth: { 
    type: Date, 
    required: true,
    messageType: "Date of birth is Required ",
  },
  image: { type: String, default:null},
  books:[
    {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: true, 
    }
  ]

});

const AuthorModel = mongoose.model("Author", AuthorSchema);
module.exports = AuthorModel;
