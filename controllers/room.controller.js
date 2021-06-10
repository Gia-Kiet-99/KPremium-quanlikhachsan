const roomModel = require('../models/room.model')


getAllRooms = async (req, res, next) => {
    try {
        const rooms = await roomModel.getAllRoomsFromDb();
        return res.json(rooms);
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error: "cannot get rooms"
        })
    }
}
getRoom = async (req, res, next) => {
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
addRoom = async (req, res, next) => {
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
getRate = async (req, res, next) => {
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
getMaxGuests = async (req, res, next) => {
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
getAvailability = async (req, res, next) => {
    try {
        const ava = await roomModel.checkIfAvailable(req.params.roomId);
        return res.json(ava);
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error: "room not found"
        })
    }
}
module.exports = {
    getAllRooms,
    getRoom,
    addRoom,
    getRate,
    getMaxGuests,
    getAvailability
}
