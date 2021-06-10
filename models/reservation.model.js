const knex = require('../config/db');

const createReservation = async (roomId, customers) => {
    try {
        const newReservation = await knex('reservation').insert({
            room_id: roomId,
            check_in_time: new Date(),
            status: "Unpaid"
        });
        const newReservationId = newReservation[0];
        const cusResdata = customers.reduce((array, cus) => {
            array.push({customer_id: cus.id_card_number, reservation_id: newReservationId});
            return array;
        }, []);
        const res = await knex('customer_reservation').insert(cusResdata);
        return res;
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

module.exports = {
    createReservation,
    getReservation
}
