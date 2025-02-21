const express = require("express");
const cors = require("cors");

const postRoutes = require("./routes/post-routes");
const userRoutes = require("./routes/user-routes");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);
app.use("/auth", userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred." });
});

mongoose
  .connect(
    "mongodb+srv://pavel:7539518462@socialmedia.nzv9q.mongodb.net/?retryWrites=true&w=majority&appName=socialMedia"
  )
  .then(() => {
    console.log("yes");
    app.listen(5000);
  })
  .catch((err) => {
    console.log("no");
  });
