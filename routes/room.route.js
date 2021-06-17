const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller');
const validator = require('../middlewares/validator.mdw');
const {isManager} = require("../middlewares/auth.mdw");

// rooms array
router.get('/', roomController.getAllRooms);

router.get('/type/:typeId', roomController.getRoomByType);
// render new room view
router.get("/new",
  isManager,
  roomController.renderNewRoomView
);
// room obj
router.get('/:roomId',
  isManager,
  roomController.renderUpdateRoomPage
);
router.patch("/:roomId",
  isManager,
  validator.validate("room"),
  roomController.updateRoomInfo
);
router.delete("/:roomId",
  isManager,
  roomController.removeRoom
);
// room obj
router.post('/',
  isManager,
  validator.validate('room'),
  roomController.addRoom
);
// num
router.get('/:roomId/rate', roomController.getRate);
// num
router.get('/:roomId/maxGuests', roomController.getMaxGuests);
// boolean
router.get('/:roomId/availability', roomController.getAvailability);


module.exports = router;