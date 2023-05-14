const authorsModel = require("../model/authors");

const getAll = async (req, res) => {
  try {
    const authors = await authorsModel.find({}, { __v: 0 }).populate("books")
    res.json(authors);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOne = async (req, res) => {
  try {
    const authorID = req.params.id;
    const author = await authorsModel.findById({ _id: authorID }).populate("books")
    if (author){
      res.json({"author": author});
    }
    else{
      res.satatus(404).json({"message": "This Author Doesn't exist"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addOne = async (req, res) => {
  try {
    await authorsModel.create(req.body)
    .then((author)=>{res.json({"success": true, "message": "Author added successfully", "data": author });})
    .catch((error)=>{res.json({"success": false, "errors": error});})

  } catch (error) {
    res.status(500).json(error);
  }
};

const editOne = async (req, res) => {
  try {
    const authorID = req.params.id;
    const author = await authorsModel.findByIdAndUpdate(authorID, {$set: req.body}, {new: true});
    res.json({"success": true, "message":"Author updated successfully", "data": author});
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const authorID = req.params.id;
    const author = await authorsModel.findByIdAndDelete(authorID);
    res.json({"success": true, "message":"Author Deleted successfully"});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAll, getOne, addOne, editOne, deleteOne };
