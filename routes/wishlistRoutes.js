const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addToWishList,
  getWishList,
  deleteWishListProduct,
} = require("../controller/wishlistController");

router.get("/", auth, getWishList);
router.post("/", auth, addToWishList);
router.delete("/", auth, deleteWishListProduct);

module.exports = router;
