const knex = require('../config/db');
const reservationModel = require('../models/reservation.model');
const customerModel = require('../models/customer.model');
const CONST = require('../config/contraint');

createReceipt = async (reservationId) => {
	try {
		const {roomRate, check_in_time} = await reservationModel.preparePayment(reservationId);
		if (roomRate != null) {
			const check_out_time = new Date();
			const noOfDays = getDaysApart(check_out_time, check_in_time)
			const surchargeNumber = await customerModel.getSurchargeNumberByReservationId(reservationId);
			const newReceipt = {
				check_out_time: check_out_time,
				total_price: roomRate * surchargeNumber * noOfDays,
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

const getDaysApart = (date1, date2) => {
	const oneDay = 24 * 60 * 60 * 1000;
	return Math.ceil(Math.abs((date1 - date2) / oneDay));
}

const getAll = async () => {
	try {
		return await knex("receipt")
			.innerJoin("reservation", "receipt.reservation_id", "reservation.id")
			.innerJoin("room", "reservation.room_id", "room.room_id")
			.innerJoin('room_type', 'room.room_type', 'room_type.type_id')
			.select("receipt.id", "room_name", "type_name", "check_in_time", "check_out_time", "total_price");
	} catch (e) {
		throw Error(e);
	}
}

module.exports = {
	createReceipt,
	getAll
}
