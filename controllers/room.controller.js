const roomModel = require('../models/room.model')
const roomTypeModel = require("../models/room_type.model");

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

module.exports = {
  getAllRooms,
  getRoom,
  addRoom,
  getRate,
  getMaxGuests,
  getAvailability,
  renderNewRoomView
}
