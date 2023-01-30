const Product = require("../models/productModel");
const User = require("../models/userModel");
const WishList = require("../models/wishlistModel");
const { getArrayOfProductsByIds } = require("../utils/products");

// add ot wishlist
const addToWishList = async (req, res) => {
  const { userId } = req;
  const { productId } = req.body;

  const wishlist = await WishList.findOne({ userId });
  //   wishlist.products.push(productId);
  //   await wishlist.save();
  //   wishlist.$getAllSubdocs()
  console.log(wishlist);
};

const deleteWishListProduct = async (req, res) => {
  const { userId } = req;
  //   const { productId } = req.body;
  //   const wishlist = await WishList.findOne({ userId });
  //   wishlist.products.filter((pro) => pro !== productId)
};
const getWishList = async (req, res) => {
  const { userId } = req;
  //   const wishlist = await WishList.findOne({ userId });
  //   const wishlistProducts = await getArrayOfProductsByIds(wishlist.products);
};
module.exports = {
  addToWishList,
  getWishList,
  deleteWishListProduct,
};
