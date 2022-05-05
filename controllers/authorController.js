const AppError = require("../utils/AppError");
const Author = require("./../models/authorModel");
const Book = require("./../models/bookModel");
const factory = require("./factoryController");

exports.createAuthor = factory.createOne(Author);
exports.getAuthors = factory.getOne(Author);

exports.getSngleAuthor = async (req, res, next) => {
  try {
    console.log(req.params.id);

    if (!req.params.id) {
      next(new AppError("Didn't get the user ,Check the request again", 404));
    }

    const author = await Author.findById(req.params.id);
    const book = await Book.findOne({ author: req.params.id });

    if ((!author, !book)) {
      return next(new AppError("unable to get the author detail", 404));
    }

    res.status(200).json({
      status: "success",
      bookLength: book.length,
      author: {
        author,
        book,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
      err: error.message,
    });
  }
};

exports.updateAuthor = factory.updateOne(Author);
exports.deleteAuthor = factory.deleteOne(Author);
