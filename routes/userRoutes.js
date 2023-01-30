const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createUser,
  logUser,
  updateUserInfo,
  updateUserPassword,
} = require("../controller/userController");

router.post("/signup", createUser);
router.post("/login", logUser);
router.patch("/info", auth, updateUserInfo);
router.patch("/pass", auth, updateUserPassword);

module.exports = router;
