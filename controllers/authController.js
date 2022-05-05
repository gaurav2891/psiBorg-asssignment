const User = require("./../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/AppError");

const signToken = (id) => {
  const token = jwt.sign({ id }, "this is my secret token", {
    expiresIn: "90d",
  });
  return token;
};

const createSendToken = (res, id) => {
  const token = signToken(id);

  const cookieOptions = {
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  console.log(token);

  //
  res.status(200).json({
    status: "success",
    token,
    // user,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const { email, password, fullName, passwordConfirm } = req.body;
    console.log(email, password, fullName, passwordConfirm);
    if ((!email || !password || !fullName, !passwordConfirm)) {
      return next(new AppError("please enter all details", 404));
    }

    const newUser = await User.create(req.body);

    console.log(newUser);

    createSendToken(res, newUser._id);
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "error",
      err: error.message,
    });
  }
};

exports.logIn = async (req, res, next) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("please enter Email and Password", 404));
    }

    const user = await User.findOne({ email }).select("+password -__v");

    // console.log(user);
    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError("please check Email and Password", 404));
    }

    req.user = user;

    console.log(user);

    createSendToken(res, user._id);
  } catch (error) {
    console.log("errorerrorerror", error);
    res.status(200).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  const cook = JSON.parse(JSON.stringify(req.cookies));
  console.log("cookies=>", cook, req.cookies);

  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError("You are not logged In", 404));
    }

    const decoded = await promisify(jwt.verify)(
      token,
      "this is my secret token"
    );

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("user didn't exist anymore", 404));
    }

    req.user = currentUser;

    next();
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "error",
      err: error.message,
    });
  }
};
