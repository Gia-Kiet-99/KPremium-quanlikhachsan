const express = require('express');
const router = express.Router();

const regulationController = require('../controllers/regulation.controller');
const validator = require("../middlewares/validator.mdw");

router.get("/", regulationController.renderRegulationPage);
router.get("/new/room-type", regulationController.renderNewRoomTypePage);
router.get("/update/room-type/:typeId", regulationController.renderUpdatePage);

router.get("/new/customer-type", regulationController.renderNewCustomerTypePage);

router.post("/room-type",
  validator.validate("roomType"),
  regulationController.createRoomType
);
router.patch("/room-type/:typeId",
  validator.validate("updateRoomType"),
  regulationController.updateRoomType
);
router.delete("/room-type/:typeId", regulationController.removeRoomType);

router.post("/customer-type",
  validator.validate("customerType"),
  regulationController.createCustomerType
);

module.exports = router;
