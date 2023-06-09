const BooksModel = require('../model/books');
const CategoriesModel = require('../model/categories');
const relationsHandler = require("./relationsController")

const getAll = async (req, res) => {
  try {
    const categories = await CategoriesModel.find({}, { __v: 0 }).populate(
      'books', {books:0, __v: 0}
    );
    return res.json({"success": true, "data":categories, "message": "all categories data are retrieved"});
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

const getOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await CategoriesModel.findById({
      _id: categoryID,
    }).populate({
      path: 'books',
      select: ['bookName','cover', 'author'],
      populate: [
        {
          path: 'author',
          select: ['firstName', 'lastName']
        }
      ]
    });
    if (category) {
      return res.json({"success": true, "data":category, "message": "all category data is retrieved"});
    } else {
      res.satatus(404).json({ "success":false, message: "This Category Doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

const addOne = async (req, res) => {
  try {
    const existCategory = await CategoriesModel.findOne({
      categoryName: req.body.categoryName,
    });
    if (existCategory) {
      return res.json({ success: false, message: 'this category arleady exists' });
    } else {
      await CategoriesModel.create(req.body)
        .then((category) => {
          return res.json({
            success: true,
            message: 'category added successfully',
            data: category,
          });
        })
        .catch((error) => {
          return res.json({ success: false, message: error.message });
        });
    }
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

const editOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const existCategory = await CategoriesModel.findOne({
      categoryName: req.body.categoryName,
      _id: { $ne: categoryID },
    });
    if (existCategory) {
      return res.json({ success: false, message: 'this category arleady exists' });
    }
    const category = await CategoriesModel.findByIdAndUpdate(
      categoryID,
      { $set: req.body },
      { new: true },
    );
    return res.json({
      success: true,
      message: 'category updated successfully',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

const deleteOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    await BooksModel.deleteMany({category: categoryID})
    const category = await CategoriesModel.findByIdAndDelete(categoryID);
    if (category){
      category.books.map((existBook, index)=>{
        let userDeleted = relationsHandler.deleteBookFromUsers(existBook._id)
        let authorDeleted = relationsHandler.deleteBookFromAuthors(existBook._id)
      })
      return res.json({ success: true, message: 'category Deleted successfully', data: category });
    }
    else{
      return res.json({ success: false, message: "category doesn't exist" });

    }
  } catch (error) {
    return res.status(500).json({"success": false, "message": error.message});
  }
};

module.exports = { getAll, getOne, addOne, editOne, deleteOne };
