const router = require('express').Router();
const regulationController = require('../controllers/regulation.controller');

router.post('/room-type/:typeId/surcharge-rate', regulationController.changeSurchargeRate);
router.post('/room-type/:typeId/max-guest', regulationController.changeMaxGuest);
router.post('/room-type/:typeId/room-rate', regulationController.changeRoomRate);
router.post('/customer-type/:typeId/surcharge', regulationController.changeCustomerSurchargeRate);

module.exports = router;
