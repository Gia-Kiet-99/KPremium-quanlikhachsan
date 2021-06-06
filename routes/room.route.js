const express = require('express');
const roomController = require('../controllers/room.controller');

const validator = require('../middlewares/validator.mdw')
const router = express.Router();

// rooms array
router.get('/', roomController.getAllRooms);
// room obj
router.get('/:roomId', roomController.getRoom);
// room obj
router.post('/', validator.validate('room'), roomController.addRoom);
// num
router.get('/:roomId/rate', roomController.getRate);
// num
router.get('/:roomId/maxGuests', roomController.getMaxGuests);
// boolean
router.get('/:roomId/availability', roomController.getAvailability);
// string
router.patch('/:roomId/checkIn', roomController.checkIn);
//string
router.patch('/:roomId/checkOut', roomController.checkOut);


module.exports = router;

