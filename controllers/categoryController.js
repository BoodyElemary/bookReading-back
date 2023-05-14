const CategoriesModel = require("../model/categories");

const getAll = async (req, res) => {
  try {
    const categories = await CategoriesModel.find({}, { __v: 0 }).populate("books")
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await CategoriesModel.findById({ _id: categoryID }).populate("books");
    if (category){
      res.json({"category": category});
    }
    else{
      res.satatus(404).json({"message": "This Category Doesn't exist"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addOne = async (req, res) => {
  try {
    const existCategory = await CategoriesModel.findOne({"categoryName": req.body.categoryName})
    if (existCategory){
      res.json({"success": false, "message": "this category arleady exists"})
    }
    else{
      await CategoriesModel.create(req.body)
      .then((category)=>{res.json({"success": true, "message": "category added successfully", "data": category });})
      .catch((error)=>{res.json({"success": false, "errors": error});})
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const editOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const existCategory = await CategoriesModel.findOne({"categoryName": req.body.categoryName, "_id":{$ne:categoryID}})
    if (existCategory){
      res.json({"success": false, "message": "this category arleady exists"})
    }
    const category = await CategoriesModel.findByIdAndUpdate(categoryID, {$set: req.body}, {new: true});
    res.json({"success":true, "message":"category updated successfully", "data": category});
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await CategoriesModel.findByIdAndDelete(categoryID);
    res.json({"message":"category Deleted successfully", "data": category});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAll, getOne, addOne, editOne, deleteOne };
