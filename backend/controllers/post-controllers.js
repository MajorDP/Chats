const HttpError = require("../models/httpError");
const mongoose = require("mongoose");
const Post = require("../models/posts");
const User = require("../models/user");

const getPosts = async (req, res, next) => {
  let posts;
  const { sortValue, uid } = req.query;

  try {
    posts = await Post.find()
      .populate("user", "username img")
      .populate("comments.user", "username img");
  } catch (error) {
    return next(new HttpError("Couldn't get posts.", 500));
  }

  //if sortValue === all, we are in Explore page => show most popular posts first
  if (sortValue === "all") {
    posts = posts.sort((a, b) => {
      const aPopularity = a.likes + a.comments.length;
      const bPopularity = b.likes + b.comments.length;

      return bPopularity - aPopularity;
    });
  }

  //if sortValue === friends, we are in Dashboard page => friends posts first, then show most popular posts
  if (sortValue === "friends") {
    let currentUser;

    try {
      currentUser = await User.findById(uid);
    } catch (error) {
      return next(new HttpError("Couldn't get posts.", 500));
    }

    posts = posts.sort((a, b) => {
      const aPopularity = a.likes + a.comments.length;
      const bPopularity = b.likes + b.comments.length;

      const aIsFriend = currentUser.friends.includes(a.user.id.toString());
      const bIsFriend = currentUser.friends.includes(b.user.id.toString());

      if (aIsFriend && !bIsFriend) {
        return -1;
      }

      if (!aIsFriend && bIsFriend) {
        return 1;
      }

      return bPopularity - aPopularity;
    });
  }

  res.json(posts.map((post) => post.toObject({ getters: true })));
};

const getPostById = async (req, res, next) => {
  const id = req.params.pid;

  let post;

  try {
    post = await Post.findById(id)
      .populate("user", "username img")
      .populate("comments.user", "username img")
      .exec();
  } catch (error) {
    return next(new HttpError("Couldn't get post.", 500));
  }

  res.json(post.toObject({ getters: true }));
};

const likePost = async (req, res, next) => {
  const postId = req.params.pid;
  const { userId } = req.body;

  let post;
  let user;

  try {
    post = await Post.findById(postId)
      .populate("user", "username img")
      .populate("comments.user", "username img");
    user = await User.findById(userId, "-password");
  } catch (error) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  if (!post || !user) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  const isLiked = user.votes.liked.find((post) => post.toString() === postId);
  const isDisliked = user.votes.disliked.find(
    (post) => post.toString() === postId
  );

  if (isLiked) {
    post.likes = post.likes - 1;
    user.votes.liked = user.votes.liked.filter(
      (post) => post.toString() !== postId
    );
  } else {
    post.likes = isDisliked ? post.likes + 2 : post.likes + 1;
    if (isDisliked) {
      user.votes.disliked = user.votes.disliked.filter(
        (post) => post.toString() !== postId
      );
    }
    user.votes.liked.push(postId);
  }
  await post.save();
  await user.save();

  const userResponse = {
    id: user.id,
    username: user.username,
    img: user.img,
    email: user.email,
    votes: user.votes,
  };
  res.json({
    post: post.toObject({ getters: true }),
    user: userResponse,
  });
};

const dislikePost = async (req, res, next) => {
  const postId = req.params.pid;
  const { userId } = req.body;

  let post;
  let user;

  try {
    post = await Post.findById(postId)
      .populate("user", "username img")
      .populate("comments.user", "username img");
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  if (!post || !user) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  const isDisliked = user.votes.disliked.find(
    (post) => post.toString() === postId
  );
  const isLiked = user.votes.liked.find((post) => post.toString() === postId);

  if (isDisliked) {
    post.likes += 1;
    user.votes.disliked = user.votes.disliked.filter(
      (id) => id.toString() !== postId
    );
  } else {
    post.likes = isLiked ? post.likes - 2 : post.likes - 1;
    if (isLiked) {
      user.votes.liked = user.votes.liked.filter(
        (post) => post.toString() !== postId
      );
    }
    user.votes.disliked.push(postId);
  }

  await post.save();
  await user.save();

  const userResponse = {
    id: user.id,
    username: user.username,
    img: user.img,
    email: user.email,
    votes: user.votes,
  };

  res.json({
    post: post.toObject({ getters: true }),
    user: userResponse,
  });
};

const postComment = async (req, res, next) => {
  const pid = req.params.pid;
  const { uid, comment } = req.body;

  let post;
  let user;
  try {
    post = await Post.findById(pid).populate("user", "username img");
    user = await User.findById(uid);
  } catch (error) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  const commentObj = {
    user: new mongoose.Types.ObjectId(uid),
    comment: comment,
    datePosted: new Date().toISOString().split("T")[0],
  };

  post.comments.push(commentObj);
  post.save();
  await post.populate("comments.user", "username img");
  res.json(post.toObject({ getters: true }));
};

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.likePost = likePost;
exports.dislikePost = dislikePost;
exports.postComment = postComment;
