const express = require("express");
const authorController = require("../controllers/authorController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/login", authController.logIn);

router
  .route("/")
  .get(authorController.getAuthors)
  // .post(authController.protect, authorController.createAuthor)
  .post(authorController.createAuthor);

router.use(authController.protect);

router
  .route("/:id")
  .get(authorController.getSngleAuthor)
  .patch(authorController.updateAuthor)
  .delete(authorController.deleteAuthor);

module.exports = router;
