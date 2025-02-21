const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  img: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", User);
