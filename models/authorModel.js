const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  dob: {
    type: Date,
  },
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
