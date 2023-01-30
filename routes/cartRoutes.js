const express = require("express");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllCartProducts,
  deleteAllProducts,
} = require("../controller/cartController");

const router = express.Router();

router.get("/", getAllCartProducts);
router.post("/", addProduct);
router.patch("/", updateProduct);
router.delete("/product", deleteProduct);
router.delete("/", deleteAllProducts);

module.exports = router;
