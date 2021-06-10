const reservationModel = require('../models/reservation.model');
const customerModel = require('../models/customer.model');

const addReservation = async (req, res) => {
    try {
        const roomId = req.body.room_id;
        const customers = req.body.customers;
        await customerModel.inputCustomers(customers);
        const result = await reservationModel.createReservation(roomId, customers);
        if (result) {
            return res.json(result);
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error: 'cannot add reservation'
        })
    }
}
const getReservation = async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const reservation = await reservationModel.getReservation(reservationId);
        if (reservation !== null) {
            return res.json(reservation);
        } else {
            return res.status(204).json({message: 'reservation not found'})
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({
            error: 'something went wrong'
        })
    }
}
module.exports = {
    addReservation,
    getReservation
}
