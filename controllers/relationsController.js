const BooksModel = require("../model/books");
const CategoriesModel = require("../model/categories");
const AuthorsModel = require("../model/authors");
const UserModel = require("../model/user");
const CategoryModel = require("../model/categories");


const deleteBookFromUsers = async(bookId)=>{
    try{
        let userBooks = await UserModel.findOneAndUpdate(
            {'userBooks.book': bookId},
            { $pull: {'userBooks': {book: bookId}} }, { new: true });

        return true
    }
    catch(error){
        return false
    }
}

const deleteBookFromCategories = async(bookId)=>{
    try{
        let categoryBooks = await CategoriesModel.findOneAndUpdate(
            {'books': bookId},
            { $pull: { books: bookId }}, { new: true });

        return true
    }
    catch(error){
        return false
    }
}

const deleteBookFromAuthors = async(bookId)=>{
    try{
        let categoryBooks = await CategoriesModel.findOneAndUpdate(
            {'books': bookId},
            { $pull: { books: bookId }}, { new: true });

        return true
    }
    catch(error){
        return false
    }
}

module.exports = {deleteBookFromUsers, deleteBookFromCategories, deleteBookFromAuthors}
