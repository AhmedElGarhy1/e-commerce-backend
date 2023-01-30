const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controller/categoryController");

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);

module.exports = router;
