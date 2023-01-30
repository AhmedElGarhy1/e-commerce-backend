const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const { createToken } = require("../utils/user");
//? helper function

const createUser = async (req, res) => {
  const { fname, lname, password, email, phone } = req.body;
  try {
    const user = await User.signup(fname, lname, password, email, phone);
    await Cart.create({ userId: user._id });
    const token = createToken(user._id, false);
    res.status(200).json({
      data: { fname, lname, email, phone, token },
      msg: "Successfully Created",
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const logUser = async (req, res) => {
  const { email, password, keep } = req.body;
  try {
    const { fname, lname, phone, _id } = await User.login(email, password);

    const token = createToken(_id, keep);
    res.status(200).json({
      data: { fname, lname, email, phone, token },
      msg: "Successfully Login",
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateUserInfo = async (req, res) => {
  const { fname, lname, phone } = req.body;
  try {
    await User.updateInfo(req.userId, fname, lname, phone);
    res.status(200).json({ msg: "Updated" });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ msg: err.message || "Unable to Update User Information" });
  }
};

const updateUserPassword = async (req, res) => {
  const password = req.body.password;
  try {
    await User.updatePassword(req.userId, password);
    res.status(200).json({ msg: "Password Updated" });
  } catch (err) {
    res
      .status(400)
      .json({ msg: err.message || "Unable to update User Password" });
  }
};

module.exports = { createUser, logUser, updateUserInfo, updateUserPassword };
