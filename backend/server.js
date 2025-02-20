const express = require("express");
const cors = require("cors");

const postRoutes = require("./routes/post-routes");
const userRoutes = require("./routes/user-routes");

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

app.listen(5000);
