const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("statistic/chart");
});

module.exports = router;