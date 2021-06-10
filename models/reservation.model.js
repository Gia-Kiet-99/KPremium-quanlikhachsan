const knex = require('../config/db');
const roomModel = require('../models/room.model');
const CONST = require('../config/contraint');

const createReservation = async (roomId, customers) => {
    try {
        if (await roomModel.checkIfAvailable(roomId)) {
            await roomModel.checkInRoom(roomId);
            const newReservation = await knex('reservation').insert({
                room_id: roomId,
                check_in_time: new Date(),
                status: CONST.RESERVATION_STATUS.UNPAID
            });
            const newReservationId = newReservation[0];
            const cusResdata = customers.reduce((array, cus) => {
                // array.push({customer_id: cus.id_card_number, reservation_id: newReservationId});
                return [...array, {customer_id: cus.id_card_number, reservation_id: newReservationId}];
            }, []);
            const res = await knex('customer_reservation').insert(cusResdata);
            if (res) {
                return {message: 'reservation created'};
            }
        } else {
            console.log('room not available');
            return {message: 'room not available'};
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getReservation = async (reservationId) => {
    const reservations = await knex('reservation').where("id", reservationId);
    if (reservations.length !== 0) {
        return reservations[0];
    }
    return null;
}

const isUnpaid = async (reservationId) => {
    const res = await knex('reservation')
        .where('id', reservationId)
        .select('status');
    console.log(res);
    const status = res[0].status;
    if (status == CONST.RESERVATION_STATUS.UNPAID) {
        return true
    } else return false;
}
const preparePayment = async (reservationId) => {
    const reservation = await getReservation(reservationId);
    if(reservation!==null){
        if (reservation.status===CONST.RESERVATION_STATUS.UNPAID){
            const roomRate = await roomModel.checkOutRoom(reservation.room_id);
            await knex('reservation')
                .update({status: CONST.RESERVATION_STATUS.PAID})
                .where('id', reservationId);
            return roomRate;
        }
    }
    return null;
}
module.exports = {
    createReservation,
    getReservation,
    isUnpaid,
    preparePayment
}
