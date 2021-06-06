const knex = require('../config/db');

module.exports = {
    getAllRoomsFromDb: () => {
        return knex('room');
    },
    getRoomById: async (roomId) => {
        return knex('room')
            .where('room_id', roomId);
    },
    createRoom: async (roomData) => {
        !roomData.status && (roomData.status = 'Available');
        await knex('room')
            .insert(roomData);
        return roomData;
    },
    getRateOfRoom: async (roomId) => {
        const res = await knex('room')
            .join('room_type', 'room.room_type', '=', 'room_type.id')
            .select('room_type.room_rate')
            .where('room_id', roomId);
        return res[0].room_rate;
    },
    getMaxGuestsOfRoom: async (roomId) => {
        const res = await knex('room')
            .join('room_type', 'room.room_type', '=', 'room_type.id')
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
        if (room.status == 'Available') {
            room.status='Unavailable';
            const res = await knex('room').update(room).where('room_id', roomId);
            if(res){
                return 'checked in'
            }
        } else if (room.status=='Unavailable'){
            return 'room unavailable'
        } else if(room.status=='Fixing'){
            return 'room fixing'
        }
        return null;
    },
    checkOutRoom: async(roomId)=>{
        const rooms = await knex('room').where('room_id', roomId);
        const room = rooms[0];
        if (room.status == 'Unavailable') {
            room.status='Available';
            const res = await knex('room').update(room).where('room_id', roomId);
            if(res){
                return 'checked out'
            }
        } else if (room.status=='Available'){
            return 'cannot checkout available room'
        } else if(room.status=='Fixing'){
            return 'room fixing'
        }
        return null;
    }
}
