const express = require('express');
const router = express.Router();

const regulationController = require("../controllers/regulation.controlller");

router.get("/", regulationController.renderRegulationPage);

module.exports = router;
