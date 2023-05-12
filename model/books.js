const mongoose = require("mongoose");

const BooksSchema = mongoose.Schema({
  bookName: {
    type: String,
    require: true,
  },
  cover: {
    type: String,
    require: true,
  },
  rate: {
    type: Number,
    max: 5,
    min: 0,
  },
  category: {
    type: String,
    require: true,
  },
  author_id: {
    type: String,
    require: true,
  },
  user_review: [
    {
      userID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true,
      },
      review: {
        type: String,
        require: true,
      },
    },
  ],
});

const BooksModels = mongoose.model("Book", BooksSchema);
module.exports = BooksModels;
