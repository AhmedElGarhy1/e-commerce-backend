const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const seller_id = "6323a0b81c1dfa69a1fdf9cc";
const { getProductData } = require("../utils/products");
// *
// create a new product
const createProduct = async (req, res) => {
  const {
    name,
    specifications,
    highlights,
    price,
    stock,
    img,
    category_id,
    // seller_id,
  } = req.body;
  try {
    await Category.findById(category_id);
    try {
      const product = await Product.create({
        name,
        specifications,
        price,
        stock,
        img,
        category_id,
        highlights,
        seller_id,
      });
      res
        .status(200)
        .json({ data: product, msg: "Product Successfully Created" });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ msg: `The Category ${categoryName} Doesn't Exist` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: `The Category ${categoryName} Doesn't Exist` });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    // const tempProducts = await Promise.all(allProducts.map(getProductData));
    res.status(200).json({ data: allProducts, msg: "All Products Here" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: `Can't get the products` });
  }
};

// get products with a category
const getProductsByCategory = async (req, res) => {
  const category_id = req.params.id;
  try {
    const allProducts = await Product.find({ category_id });
    const tempProducts = await Promise.all(allProducts.map(getProductData));
    res.status(200).json({ data: tempProducts, msg: "Successfully Created" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Invalid category's ID" });
  }
};

// get a single product
const getProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    // await Product.updateMany({}, { $set: { stock: 950 } });
    const product = await Product.findOneAndUpdate(
      { _id },
      { $inc: { views: +1 } }
    );
    // someone had saw the product
    const tempProduct = await getProductData(product);
    res.status(200).json({ data: tempProduct, msg: "Product is Here" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Product Doesn't Exist" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProduct,
};
