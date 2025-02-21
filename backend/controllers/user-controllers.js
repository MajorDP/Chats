const HttpError = require("../models/httpError");
const User = require("../models/user");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError("Sign in failed, please try again later.", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Invalid credentials", 422));
  }

  const userResponse = {
    id: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
  };

  res.json(userResponse);
};

const register = async (req, res, next) => {
  const { email, username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return next(new HttpError("Passwords don't match.", 401));
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Sign up failed, please try again later.", 500));
  }

  if (existingUser) {
    return next(new HttpError("User with this email already exists.", 422));
  }

  const createdUser = new User({
    email,
    password,
    username,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Sign up failed, please try again later.", 500));
  }

  const userResponse = {
    id: createdUser.id,
    email: createdUser.email,
    username: createdUser.username,
  };

  res.status(201).json(userResponse);
};

exports.login = login;
exports.register = register;
