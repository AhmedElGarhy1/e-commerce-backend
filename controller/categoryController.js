const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

// create a new category
const addCategory = async (req, res) => {
  const { name, disc } = req.body;
  try {
    const category = await Category.create({ name, disc, productsNum: 0 });
    res
      .status(200)
      .json({ data: category, msg: "Category Successfully Created" });
    res.end();
  } catch (err) {
    res.status(400).json({
      msg: `The category name and description are required or It this category is already Exist`,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res
      .status(200)
      .json({ data: allCategories, msg: "All Categories Are Here" });
  } catch (err) {
    res.status(400).json({ msg: "Can't Get The categories" });
  }
};

module.exports = {
  addCategory,
  getCategories,
};
