const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

const getArrayOfProductsByIds = async (products) => {
  return await Promise.all(
    products.map(async (prod) => {
      const product = await Product.findById(prod.product_id);
      return {
        ...product._doc,
        quantity: prod.quantity,
      };
    })
  );
};

const getProductData = async (product) => {
  const category = await Category.findById(product.category_id);
  const seller = await User.findById(product.seller_id);
  const { _doc: temp } = { ...product };
  temp.category_name = category.name;
  temp.seller_name = `${seller.fname} ${seller.lname}`;
  return temp;
};

module.exports = {
  getArrayOfProductsByIds,
  getProductData,
};
