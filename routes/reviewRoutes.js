const express = require("express");
const {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} = require("../controller/reviewController");

const router = express.Router();

router.get("/", getReviews);
router.post("/", addReview);
router.delete("/", deleteReview);
router.patch("/", updateReview);

module.exports = router;
