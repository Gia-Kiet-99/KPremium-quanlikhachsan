const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller');
const validator = require('../middlewares/validator.mdw');

// rooms array
router.get('/', roomController.getAllRooms);
// render new room view
router.get("/new", roomController.renderNewRoomView);
// room obj
router.get('/:roomId', roomController.renderUpdateRoomPage);
router.patch("/:roomId",
  validator.validate("room"),
  roomController.updateRoomInfo
);
router.delete("/:roomId", roomController.removeRoom);
// room obj
router.post('/', validator.validate('room'), roomController.addRoom);
// num
router.get('/:roomId/rate', roomController.getRate);
// num
router.get('/:roomId/maxGuests', roomController.getMaxGuests);
// boolean
router.get('/:roomId/availability', roomController.getAvailability);


module.exports = router;