const roomModel = require("../models/room.model");
const roomTypeModel = require("../models/room_type.model");
const Config = require("../config/contraint");

const renderHomePage = async (req, res) => {
  const rooms = await roomModel.getAllRoomsFromDb();
  const types = await roomTypeModel.getAll();
  console.log(rooms);

  // let availableNum = 0, unAvailableNum = 0, fixingNum = 0;
  let availableRooms = [], unavailableRooms = [], fixingRooms = [];
  for (const room of rooms) {
    if (room.status === Config.ROOM_STATUS.AVAILABLE) {
      // availableNum++;
      availableRooms.push(room);
    } else if (room.status === Config.ROOM_STATUS.UNAVAILABLE) {
      unavailableRooms.push(room);
    } else {
      fixingRooms.push(room);
    }
  }

  res.render("index", {
    activeMenu: "home-item",
    rooms: rooms,
    types: types,
    availableRooms: availableRooms,
    unavailableRooms: unavailableRooms,
    fixingRooms: fixingRooms
  });
}

module.exports = {
  renderHomePage
}
