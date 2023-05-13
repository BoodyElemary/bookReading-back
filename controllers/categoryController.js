const mongoose = require("mongoose");
const CategoriesModel = mongoose.model("Category");

const getAll = async (req, res) => {
  try {
    const categories = await CategoriesModel.find({}, { __v: 0 })
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await CategoriesModel.findById({ _id: categoryID });
    res.json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addOne = async (req, res) => {
  try {
    const category = await CategoriesModel(req.body);
    await category.save();
    res.json("category added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const editOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await CategoriesModel.findByIdAndUpdate(categoryID, {$set: req.body}, {new: true});
    res.json({"message":"category updated successfully", "data": category});
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await CategoriesModel.findByIdAndDelete(categoryID);
    res.json("category Deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAll, getOne, addOne, editOne, deleteOne };
