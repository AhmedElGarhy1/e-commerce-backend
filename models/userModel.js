const mongoose = require("mongoose");
const { ROLES } = require("../enums");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.SELLER, ROLES.BUYER],
      default: ROLES.BUYER,
    },
    // cart_id: { type: Schema.Types.ObjectId, ref: "Cart" },
    //   buying_history
    //   reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { timestamps: true }
);

// make a static method to create a user with a hashed password
userSchema.statics.signup = async function (
  fname,
  lname,
  password,
  email,
  phone
) {
  if (!fname || !lname || !password || !email || !phone) {
    throw Error("All Fields Must Be Filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email Not Valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is Not Strong Enough");
  }

  const exists = await this.findOne({ email });
  if (exists) throw Error("Email is already Exist");
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    fname,
    lname,
    password: hash,
    email,
    phone,
  });
  return user;
};

userSchema.statics.update = async function (id, fname, lname, phone) {
  if (!fname || !lname || !phone) {
    throw Error("All Fields Must Be Filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email Not Valid");
  }

  const user = await this.findByIdAndUpdate(id, {
    $set: { fname, lname, phone },
  });
  if (!user) throw Error("Email is already Exist");
  return user;
};

// make a static method to login the user with a hashed password
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("email");
  }
  const user = await this.findOne({ email });

  if (!user) throw Error("email");
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw Error("password");

  return user;
};

userSchema.statics.updateInfo = async function (id, fname, lname, phone) {
  if (!fname || !lname || !phone) {
    throw Error("All Fields Must Be Filled");
  }
  const user = await this.findByIdAndUpdate(id, {
    $set: { fname, lname, phone },
  });
  if (!user) throw Error("Email is already Exist");
  return user;
};

// make a static method to login the user with a hashed password
userSchema.statics.updatePassword = async function (id, password) {
  if (!id) throw Error("UnauthorizedUser");
  if (!validator.isStrongPassword(password || "")) {
    throw Error("Password is Not Strong Enough");
  }

  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.findByIdAndUpdate(id, {
    $set: { password: hash },
  });

  return user;
};
module.exports = mongoose.model("User", userSchema);
