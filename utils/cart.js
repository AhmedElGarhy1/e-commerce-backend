const { CART_STATUS } = require("../enums");

const cartOptions = (req) => {
  return {
    userId: req.userId,
    status: CART_STATUS.OPEN,
  };
};

const isExist = (cart, product_id) =>
  cart.products.find((product) => product.product_id.toString() === product_id);

const updateCart = (cart, product_id, quantity) =>
  cart.products.map((product) => {
    if (product_id === product.product_id.toString()) {
      product.quantity = quantity;
      return product;
    } else return product;
  });

module.exports = {
  cartOptions,
  isExist,
  updateCart,
};
