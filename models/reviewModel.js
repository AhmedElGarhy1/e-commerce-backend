const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    comment: String,
    rate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WishList", wishListSchema);
