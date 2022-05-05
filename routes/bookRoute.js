const express = require("express");
const authController = require("./../controllers/authController");
const bookController = require("../controllers/bookController");

const router = express.Router();

// router.route("/").get(bookController.getBooks).post(authController.protect, bookController.createBook);
router.route("/").get(bookController.getBooks).post(bookController.createBook);

// router.use(authController.protect);

router
  .route("/:id")
  .get(bookController.getSngleBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
