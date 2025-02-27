const express = require("express");
const userController = require("../controllers/user-controllers");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/friends/:uid", userController.getFriends);
router.patch("/friends/add", userController.sendFriendRequest);
router.patch("/friends/handle", userController.acceptRejectFriendRequest);

module.exports = router;
