const roomModel = require("../models/room.model");
const Config = require("../config/contraint");

const renderHomePage = async (req, res) => {
  const rooms = await roomModel.getAllRoomsFromDb();
  console.log(rooms);

  let availableNum = 0, unAvailableNum = 0, fixingNum = 0;
  for (const room of rooms) {
    if (room.status === Config.ROOM_STATUS.AVAILABLE) {
      availableNum++;
    } else if (room.status === Config.ROOM_STATUS.UNAVAILABLE) {
      unAvailableNum++;
    } else {
      fixingNum++;
    }
  }

  res.render("index", {
    activeMenu: "home-item",
    rooms: rooms,
    availableNum: availableNum,
    unAvailableNum: unAvailableNum,
    fixingNum: fixingNum
  });
}

module.exports = {
  renderHomePage
}