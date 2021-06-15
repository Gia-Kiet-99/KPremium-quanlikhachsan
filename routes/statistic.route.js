const express = require("express");
const router = express.Router();

const statisticController = require("../controllers/statistic.controller");

router.get("/", statisticController.renderChartsPage);
router.get("/monthly-revenue", statisticController.getMonthlyRevenue);

module.exports = router;