const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    disc: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    // products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
