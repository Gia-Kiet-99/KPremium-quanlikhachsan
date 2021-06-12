const knex = require('../config/db');
const CONST = require('../config/contraint');

module.exports = {
  getAllRoomsFromDb: async () => {
    try {
      return knex('room')
        .join('room_type', 'room.room_type', '=', 'room_type.type_id')
        .select("room_id", "room_name", "status", "note", "type_name");
    } catch (e) {
      throw Error(e);
    }
  },
  getRoomById: async (roomId) => {
    return knex('room')
      .where('room_id', roomId);
  },
  createRoom: async (roomData) => {
    !roomData.status && (roomData.status = CONST.ROOM_STATUS.AVAILABLE);
    await knex('room')
      .insert(roomData);
    return roomData;
  },
  getRateOfRoom: async (roomId) => {
    const res = await knex('room')
      .join('room_type', 'room.room_type', '=', 'room_type.type_id')
      .select('room_type.room_rate')
      .where('room_id', roomId);
    return res[0].room_rate;
  },
  getMaxGuestsOfRoom: async (roomId) => {
    const res = await knex('room')
      .join('room_type', 'room.room_type', '=', 'room_type.type_id')
      .select('room_type.max_of_customer')
      .where('room_id', roomId);
    return res[0].max_of_customer;
  },
  checkIfAvailable: async (roomId) => {
    const res = await knex('room')
      .where('room_id', roomId)
      .select('status');
    console.log(res);
    const status = res[0].status;
    if (status == 'Available') {
      return true
    } else return false;
  },
  checkInRoom: async (roomId) => {
    const rooms = await knex('room').where('room_id', roomId);
    const room = rooms[0];
    if (room.status == CONST.ROOM_STATUS.AVAILABLE) {
      room.status = CONST.ROOM_STATUS.UNAVAILABLE;
      const res = await knex('room').update(room).where('room_id', roomId);
      if (res) {
        console.log('checked in');
        return 1;
      }
    } else if (room.status == CONST.ROOM_STATUS.UNAVAILABLE) {
      console.log('room unavailable');
      return 0;
    } else if (room.status == CONST.ROOM_STATUS.FIXING) {
      console.log('room fixing');
      return -1;
    }
    return null;
  },
  checkOutRoom: async (roomId) => {
    const rooms = await knex('room').where('room_id', roomId)
      .join('room_type', 'room.room_type', '=', 'room_type.type_id');
    const room = rooms[0];
    if (room.status == CONST.ROOM_STATUS.UNAVAILABLE) {
      const res = await knex('room').update({status: CONST.ROOM_STATUS.AVAILABLE}).where('room_id', roomId);
      if (res) {
        console.log('checked out');
        return room.room_rate;
      }
    } else if (room.status == CONST.ROOM_STATUS.AVAILABLE) {
      console.log('cannot checkout available room');
      return 0;
    } else if (room.status == CONST.ROOM_STATUS.FIXING) {
      console.log('room fixing');
      return -1;
    }
    return null;
  }
}
