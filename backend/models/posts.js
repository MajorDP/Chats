const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
  datePosted: { type: Date, required: true },
  user: { type: mongoose.ObjectId, ref: "User", required: true },
  message: { type: String, required: true, maxlength: 200 },
  postImg: { type: String, required: false },
  likes: { type: Number, default: 0 },
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: { type: String, required: true, maxlength: 500 },
      datePosted: { type: Date, required: true },
      likes: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Post", Post);
