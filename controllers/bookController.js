const { json } = require("express/lib/response");
const Book = require("./../models/bookModel");
const Author = require("./../models/authorModel");
const factory = require("./factoryController");

// exports.createBook = factory.createOne(Book);
exports.createBook = async (req, res, next) => {
  try {
    console.log(req.body);

    const authorData = await Author.findOne({ name: req.body.author });
    req.body.author = authorData._id;
    const newModel = await Book.create(req.body);

    res.status(200).json({
      status: "success",
      data: newModel,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

// exports.getBooks = factory.getOne(Book);
exports.getBooks = async (req, res, next) => {
  try {
    const book = await Book.find().populate({
      path: "author",
      select: "name ",
    });
    if (!book) {
      next(new AppError("Didn't get the user ,Check the request again", 404));
    }

    res.status(200).json({
      status: "success",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
      err: error.message,
    });
  }
};

exports.getSngleBook = async (req, res, next) => {
  try {
    console.log(req.params.id, req.body);

    if (!req.params.id) {
      next(new AppError("Didn't get the user ,Check the request again", 404));
    }

    const book = await Book.findById(req.params.id).populate({
      path: "author",
      select: "name ",
    });

    res.status(200).json({
      status: "success",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
      err: error.message,
    });
  }
};

exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);
