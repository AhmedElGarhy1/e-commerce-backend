const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: Number,
    stock: {
      type: Number,
      required: true,
    },
    highlights: [
      {
        type: String,
      },
    ],
    specifications: [[{ type: String }]],
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    // reviews: Number,
    // reviews
    // specifications
    // // user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
