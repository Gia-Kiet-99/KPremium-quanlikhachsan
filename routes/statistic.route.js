const express = require("express");
const router = express.Router();

const statisticController = require("../controllers/statistic.controller");

router.get("/", statisticController.renderChartsPage);
router.get("/monthly-revenue", statisticController.getMonthlyRevenue);
router.get("/room-usage-density", statisticController.getRoomUsageDensity);

module.exports = router;