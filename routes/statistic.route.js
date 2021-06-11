const express = require("express");
const router = express.Router();

const statisticController = require("../controllers/statistic.controller");

router.get("/", statisticController.renderChartsPage);

module.exports = router;