const roomModel = require('../models/room.model')

module.exports = {
    getAllRooms: async (req, res, next) => {
        const rooms = await roomModel.getAllRoomsFromDb();
        return res.json(rooms);
    },
    getRoom: async (req, res, next) => {
        const room = await roomModel.getRoomById(req.params.roomId);
        return res.json(room[0]);
    },
    addRoom: async (req, res, next) => {
        const room = await roomModel.createRoom(req.body);
        return res.json(room);
    },
    getRate: async (req, res, next) => {
        const rate = await roomModel.getRateOfRoom(req.params.roomId);
        return res.json(rate);
    },
    getMaxGuests: async (req, res, next) => {
        const maxGuestsNum = await roomModel.getMaxGuestsOfRoom(req.params.roomId);
        return res.json(maxGuestsNum);
    },
    getAvailability: async (req, res, next) => {
        const ava = await roomModel.checkIfAvailable(req.params.roomId);
        return res.json(ava);
    },
    checkIn: async (req, res, next) => {
        const result = await roomModel.checkInRoom(req.params.roomId);
        return res.json(result);
    },
    checkOut: async (req, res, next) => {
        const result = await roomModel.checkOutRoom(req.params.roomId);
        return res.json(result);
    }
}
