const HttpError = require("../models/httpError");
const Post = require("../models/posts");

const mockPosts = [
  {
    id: "p1",
    datePosted: "19.02.2025",
    username: "Asura",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    message: "This shit so ass",
    img: "https://preview.redd.it/this-shit-is-so-ass-v0-33ef927zzngd1.jpeg?width=1080&crop=smart&auto=webp&s=33c6fd685d73fa6ba4bc9dda21c60c12a3938c1d",
    likes: 254,
    comments: [
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment:
          "Amazing posAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postAmazing postt",
        likes: 0,
      },
    ],
  },
  {
    id: "p2",
    datePosted: "19.02.2025",
    username: "Asura",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    message: "This shit so ass",
    img: "https://cdn.discordapp.com/attachments/648600190919376897/1341571085082034288/IMG_8501.jpg?ex=67b67aef&is=67b5296f&hm=3266b5f53671bf22db6d5ea81fdabaafd45db7adb9297ae54cbe3b99a39d93a8&",
    likes: 254,
    comments: [
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
    ],
  },
];

const getPosts = async (req, res, next) => {
  let posts;

  try {
    posts = await Post.find()
      .populate("user", "username img")
      .populate("comments.user", "username img");
  } catch (error) {
    return next(new HttpError("Couldn't get posts.", 500));
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

  const post = Post.findById(postId);

  if (postIndex === -1) {
    return next(new HttpError("Post could not be found", 404));
  }

  // Create a new object to avoid mutating the original reference
  mockPosts[postIndex] = {
    ...mockPosts[postIndex],
    likes: mockPosts[postIndex].likes + 1,
  };

  console.log("Updated likes:", mockPosts[postIndex].likes);

  res.json(mockPosts[postIndex]);
};

const dislikePost = async (req, res, next) => {
  const postId = req.params.pid;

  const postIndex = mockPosts.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return next(new HttpError("Post could not be found", 404));
  }

  // Create a new object to avoid mutating the original reference
  mockPosts[postIndex] = {
    ...mockPosts[postIndex],
    likes: mockPosts[postIndex].likes - 1,
  };

  console.log("Updated likes:", mockPosts[postIndex].likes);

  res.json(mockPosts[postIndex]);
};

const postComment = async (req, res, next) => {
  const pid = req.params.pid;
  const comment = req.body;
  const post = mockPosts.find((post) => post.id === pid);
  console.log(comment);
  post.comments.unshift(comment);
  res.json(post);
};

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.likePost = likePost;
exports.dislikePost = dislikePost;
exports.postComment = postComment;
