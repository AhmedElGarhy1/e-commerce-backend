const express = require("express");
const { querySearch } = require("../controller/searchController");

const router = express.Router();

router.post("/", querySearch);

module.exports = router;
