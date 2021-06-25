const knex = require('../config/db');

const changeMaxGuestsOfRoom = async (typeId, maxGuestNum) => {
	try {
		const res = await knex('room_type')
			.update({max_of_customer: maxGuestNum})
			.where('type_id', typeId);
		return res;
	} catch (e) {
		console.log(e);
		throw Error(e);
	}
}

const changeRoomSurchargeRate = async (typeId, surchargeRate) => {
	try {
		const res = await knex('room_type')
			.update({surcharge_rate: surchargeRate})
			.where('type_id', typeId);
		return res;
	} catch (e) {
		console.log(e);
		throw Error(e);
	}
}
module.exports = {
	changeMaxGuestsOfRoom,
	changeRoomSurchargeRate
}

