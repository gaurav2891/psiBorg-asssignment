const express = require("express");
const router = express.Router();

const Book = require("./../models/bookModel");
const Author = require("./../models/authorModel");

router.get("/login", (req, res) => {
  res.status(200).render("login");
});

router.get("/signUp", (req, res) => {
  res.status(200).render("signUp");
});

router.get("/", async (req, res) => {
  const book = await Book.find().populate({
    path: "author",
    select: "name",
  });

  console.log(book);
  res.status(200).render("allBooks", book);
});

router.get("/create_book", (req, res) => {
  res.status(200).render("createBook");
});
router.get("/create_author", (req, res) => {
  res.status(200).render("createAuthor");
});

module.exports = router;
