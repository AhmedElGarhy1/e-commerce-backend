const Product = require("../models/productModel");

const makeFilters = (body) => {
  const { categoryIds, prices, minRate, query } = body;

  // search by product name by reqExp
  const regex = new RegExp(`.*${query}.*`, "i");

  const filters = {
    rate: { $gte: minRate },
    $and: [{ $or: [{ name: regex }, { highlights: regex }] }],
  };

  //if the there are selected category
  if (categoryIds.length !== 0) {
    filters.category_id = { $in: categoryIds };
  }

  //if the there are selected prices
  if (prices.length !== 0) {
    let temp = [];
    for (let price of prices) {
      temp.push({
        price: {
          $lte: price.max,
          $gte: price.min,
        },
      });
    }
    filters.$and = [...filters.$and, { $or: temp }];
  }
  return filters;
};

const querySearch = async (req, res) => {
  const filters = makeFilters(req.body);

  try {
    const products = await Product.find(filters);
    res.status(200).json({ data: products, msg: "allProducts" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "something wrong in search" });
  }
};

const autoComplete = (req, res) => {};

module.exports = { querySearch };
