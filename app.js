const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

const bookRoute = require("./routes/bookRoute");
const authorRoute = require("./routes/authorRoute");
const viewRoute = require("./routes/viewRoute");

const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(mongoSanitize());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("This app hit this Middleware 🤗🙂🙂☺🤗");
  next();
});

app.use("/", viewRoute);
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/author", authorRoute);

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "failed",
    message: `unable to find ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
