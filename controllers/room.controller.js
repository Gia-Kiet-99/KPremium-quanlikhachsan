const roomModel = require('../models/room.model')
const roomTypeModel = require("../models/room_type.model");
const Config = require("../config/contraint");

const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getAllRoomsFromDb();
    // return res.json(rooms);
    res.render("management/index/room", {
      rooms: rooms,
      activeMenu: "room-item"
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "cannot get rooms"
    })
  }
}
const getRoom = async (req, res) => {
  try {
    const room = await roomModel.getRoomById(req.params.roomId);
    return res.json(room[0]);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "room not found"
    })
  }
}
const addRoom = async (req, res) => {
  try {
    const room = await roomModel.createRoom(req.body);
    return res.json(room);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "cannot add room"
    })
  }
}
const getRate = async (req, res) => {
  try {
    const rate = await roomModel.getRateOfRoom(req.params.roomId);
    return res.json(rate);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "room not found"
    })
  }
}
const getMaxGuests = async (req, res) => {
  try {
    const maxGuestsNum = await roomModel.getMaxGuestsOfRoom(req.params.roomId);
    return res.json(maxGuestsNum);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "room not found"
    })
  }
}
const getAvailability = async (req, res) => {
  try {
    const ava = await roomModel.checkIfAvailable(req.params.roomId);
    return res.json(ava);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "room not found"
    });
  }
}

const renderNewRoomView = async (req, res) => {
  const types = await roomTypeModel.getAll();
  console.log(types);

  res.render("management/add/room", {
    types: types,
    activeMenu: "room-item"
  });
}

const renderUpdateRoomPage = async (req, res, next) => {
  const roomId = req.params.roomId || 0;

  const rooms = await roomModel.getRoomById(roomId);
  console.log(JSON.stringify(rooms, null, 2));

  if (rooms.length === 0) {
    return next();
  }

  const types = await roomTypeModel.getAll();
  const statuses = Object.values(Config.ROOM_STATUS);

  console.log(JSON.stringify(types, null, 2));
  console.log(statuses);

  res.render("management/update/room", {
    activeMenu: "room-item",
    room: rooms[0],
    types: types,
    statuses: statuses
  });
}

const updateRoomInfo = async (req, res) => {
  const roomId = req.params.roomId;
  const dataToUpdate = req.body;

  const isExists = await roomModel.getRoomById(roomId);
  if (isExists.length === 0) {
    return res.status(400).json({
      error_message: "room not found"
    });
  }
  const updatedRoom = await roomModel.update(roomId, dataToUpdate);
  res.json(updatedRoom);
}

module.exports = {
  getAllRooms,
  getRoom,
  addRoom,
  getRate,
  getMaxGuests,
  getAvailability,
  renderNewRoomView,
  renderUpdateRoomPage,
  updateRoomInfo
}
