const express = require('express');
const router = express.Router();

const indexController = require("../controllers/index.controller");

/* GET home page. */
router.get('/', indexController.renderHomePage);

module.exports = router;
