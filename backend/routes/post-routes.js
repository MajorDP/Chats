const express = require("express");
const postController = require("../controllers/post-controllers");

const router = express.Router();

router.patch("/like/:pid", postController.likePost);
router.patch("/dislike/:pid", postController.dislikePost);
router.patch("/comment/:pid", postController.postComment);
router.get("/", postController.getPosts);
router.get("/:pid", postController.getPostById);

module.exports = router;
