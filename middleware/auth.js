const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).json({ msg: "unauthorized User" });
  try {
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(_id).select("_id");
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "unauthorized User" });
  }
};

module.exports = auth;
