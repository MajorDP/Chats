const express = require("express");
const userController = require("../controllers/user-controllers");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
