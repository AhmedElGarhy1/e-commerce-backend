require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("mongoose");
const apiInfo = require("./apiInfo");
// ?import all routes
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
// const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const searchRoutes = require("./routes/searchRoutes");

// ?import middleware
const catchError = require("./middleware/catchError");
const auth = require("./middleware/auth");
// middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const upload = multer({ storage });

// * handle Category routes
app.use("/api/category", categoryRoutes);
// * handle Products routes
app.use("/api/products", productRoutes);
// * handle wishlist routes
app.use("/api/wishlist", wishlistRoutes);
// * handle Users routes
app.use("/api/user", userRoutes);
// * handle Cart routes
app.use("/api/cart", auth, cartRoutes);
// * handle Cart routes
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
  res.json(apiInfo);
});

// ? middleware error
app.use(catchError);

const PORT = process.env.PORT || 8000;
connect(process.env.MONGO_URL, () => {
  app.listen(PORT, () =>
    console.log(`Connected to DB && Listening on Port ${PORT}`)
  );
});
