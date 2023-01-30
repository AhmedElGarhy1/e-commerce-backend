const express = require("express");
const auth = require("../middleware/auth");
const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProduct,
} = require("../controller/productController");
const router = express.Router();

// create new products
router.get("/", getAllProducts);
router.get("/category/:id", getProductsByCategory);
router.get("/:id", getProduct);
router.post("/create", createProduct);

module.exports = router;
