const knex = require('../config/db');
const reservationModel = require('../models/reservation.model');
const customerModel = require('../models/customer.model');
const CONST = require('../config/contraint');

createReceipt = async (reservationId) => {
    try {
        const roomRate = await reservationModel.preparePayment(reservationId);
        if (roomRate != null) {
            const surchargeNumber = await customerModel.getSurchargeNumberByReservationId(reservationId);
            const newReceipt = {
                check_out_time: new Date(),
                total_price: roomRate * surchargeNumber,
                reservation_id: reservationId
            }
            const newId = await knex('receipt').insert(newReceipt);
            return {...newReceipt, id: newId[0]}
        } else {
            console.log('reservation not found');
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}
module.exports = {createReceipt}
