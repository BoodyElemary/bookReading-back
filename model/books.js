const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    max: 5,
    min: 0,
    default: 0,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  user_review: [
    {
      userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
    },
  ],
  
  user_rate: [
    {
      userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rate: {
        type: Number,
        required: true,
        max: 5,
        min: 0,
        default: 0,
      },
    },
  ],
});

const BooksModels = mongoose.model('Book', BooksSchema);
module.exports = BooksModels;
