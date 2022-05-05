const mongoose = require("mongoose");
const slugify = require("slugify");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "Author",
    required: [true, "An book must related to an author"],
  },
  publishedOn: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  slug: String,
});

bookSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
