const mongoose = require("mongoose");
const { CART_STATUS } = require("../enums");
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: [CART_STATUS.OPEN, CART_STATUS.FINISHED, CART_STATUS.PROCESSING],
      default: CART_STATUS.OPEN,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
