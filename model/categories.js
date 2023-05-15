const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  ],
});

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;
