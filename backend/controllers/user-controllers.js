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
  console.log(existingUser.friends);
  const userResponse = {
    id: existingUser.id,
    img: existingUser.img,
    email: existingUser.email,
    username: existingUser.username,
    votes: existingUser.votes,
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
    votes: createdUser.votes,
  };

  res.status(201).json(userResponse);
};

const getFriends = async (req, res, next) => {
  const uid = req.params.uid;
  let existingUser;

  try {
    existingUser = await User.findById(uid, "friends requests")
      .populate("friends", "username img")
      .populate("requests", "username img");
  } catch (error) {
    return next(new HttpError("Sign in failed, please try again later.", 500));
  }

  res.json({
    friends: existingUser.friends.map((friend) =>
      friend.toObject({ getters: true })
    ),
    requests: existingUser.requests.map((request) =>
      request.toObject({ getters: true })
    ),
  });
};

const sendFriendRequest = async (req, res, next) => {
  const { id, username } = req.body;

  let foundUser;
  let currentUser;
  try {
    currentUser = await User.findById(id, "username");
    foundUser = await User.findOne({ username }).populate("requests");
  } catch (error) {
    return next(new HttpError("Could not find user.", 500));
  }

  if (!foundUser || !currentUser) {
    return next(new HttpError("Could not find user.", 404));
  }

  if (currentUser.username === username) {
    return next(new HttpError("That's you.", 400));
  }

  if (foundUser.requests.find((req) => req.id === id)) {
    return next(new HttpError("Request already sent.", 500));
  }

  try {
    foundUser.requests.push(id);
    await foundUser.save();
  } catch (error) {
    return next(new HttpError("Could not send request.", 500));
  }

  res.json({ message: "Request sent" });
};

const acceptRejectFriendRequest = async (req, res, next) => {
  const { userId, friendId, type } = req.body;

  let currentUser;
  let friend;

  try {
    currentUser = await User.findById(userId);
    friend = await User.findById(friendId);
  } catch (error) {
    return next(new HttpError("Could not find user.", 500));
  }

  if (type === "accept") {
    currentUser.friends.push(friendId);
    friend.friends.push(userId);
    currentUser.requests = currentUser.requests.filter(
      (request) => request.toString() !== friendId
    );

    try {
      await currentUser.save();
      await friend.save();
    } catch (error) {
      return next(new HttpError("Could not add friend.", 500));
    }
    res.json({
      friends: {
        id: friend.id.toString(),
        username: friend.username,
        img: friend.img,
      },
      requests: currentUser.requests.map((request) => request.toString()),
    });
  }

  if (type === "reject") {
    currentUser.requests = currentUser.requests.filter(
      (request) => request.toString() !== friendId
    );
    try {
      await currentUser.save();
      await friend.save();
    } catch (error) {
      return next(new HttpError("Could not reject request.", 500));
    }
    res.json({
      friends: null,
      requests: currentUser.requests.map((request) => request.toString()),
    });
  }
};

exports.login = login;
exports.register = register;
exports.getFriends = getFriends;
exports.sendFriendRequest = sendFriendRequest;
exports.acceptRejectFriendRequest = acceptRejectFriendRequest;
