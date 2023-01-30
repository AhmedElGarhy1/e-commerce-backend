const Cart = require("../models/cartModel");
const { getArrayOfProductsByIds } = require("../utils/products");
const { cartOptions, isExist, updateCart } = require("../utils/cart");

//* Controller Function
const addProduct = async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    if (!product_id || !quantity) throw Error("Can't Add Product");
    const cart = await Cart.findOne(cartOptions(req));
    if (isExist(cart, product_id)) throw Error("Product Is Already In Cart");

    cart.products.unshift({
      product_id,
      quantity,
    });

    await cart.save();
    res.status(200).json({ msg: "Successfully added to Cart" });
  } catch (err) {
    res.status(400).json({ msg: err.message || "Can't Add Product" });
  }
};
const updateProduct = async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    if (!product_id || !quantity) throw Error("Can't Update Product");
    const cart = await Cart.findOne(cartOptions(req));
    if (!isExist(cart, product_id)) throw Error("Product Isn't in the Cart");
    cart.products = updateCart(cart, product_id, quantity);
    await cart.save();
    res.status(200).json({ data: cart, msg: "Successfully Updated" });
  } catch (err) {
    res.status(400).json({ msg: err.message || "Backend Error" });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    if (!id) throw Error("Id Is required");
    const cart = await Cart.findOne(cartOptions(req));
    if (!isExist(cart, id)) throw Error("Product Isn't In Cart");
    cart.products = cart.products.filter(
      (product) => product.product_id.toString() !== id
    );
    await cart.save();
    res.status(200).json({ msg: "Successfully Deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message || "Can't Delete Product" });
  }
};
const deleteAllProducts = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(cartOptions(req), { $set: { products: [] } });
    res.status(200).json({ msg: "Successfully Deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Can't Delete Product" });
  }
};
const getAllCartProducts = async (req, res) => {
  try {
    const cart = await Cart.findOne(cartOptions(req));
    // cart.products = [];
    // await cart.save();
    const cartProducts = await getArrayOfProductsByIds(cart.products);
    const newCart = { ...cart._doc, products: cartProducts };
    res.status(200).json({ data: newCart, msg: "All Cart Products Are Here" });
  } catch (err) {
    res.status(400).json({ msg: "Can't Get All Products" });
  }
};

module.exports = {
  deleteAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getAllCartProducts,
};
