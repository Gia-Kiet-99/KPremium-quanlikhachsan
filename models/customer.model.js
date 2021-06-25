const knex = require('../config/db');

const getAllCustomersFromDb = async () => {
	try {
		return await knex('customer').innerJoin(
			'customer_type',
			'customer.type',
			'customer_type.type_id'
		).select(
			"id_card_number",
			"name",
			"address",
			"type_name"
		);
	} catch (e) {
		throw Error(e);
	}
}

const isExist = async (customerIdCardNum) => {
	const customer = await knex('customer').where("id_card_number", customerIdCardNum);
	return customer;
}

const addCustomer = async (customerData) => {
	try {
		await knex('customer').insert(customerData);
		return customerData;
	} catch (e) {
		return null;

	}
}

const inputCustomers = async (customers) => {
	const ids = customers.map(customer => customer.id_card_number);
	const resCustomers = await knex('customer').whereIn("id_card_number", ids).select("id_card_number");
	const existedIds = resCustomers.map(customer => customer.id_card_number);
	const toAddCustomers = customers.filter(customer => !existedIds.includes(customer.id_card_number));
	if (toAddCustomers.length !== 0) {
		await knex('customer').insert(toAddCustomers);
	}
}

const getSurchargeNumberByReservationId = async (reservationId) => {
	const customers = await knex('customer_reservation')
		.innerJoin('customer', 'customer_reservation.customer_id', 'customer.id_card_number')
		.innerJoin('customer_type', 'customer.type', 'customer_type.type_id')
		.select('customer.type', 'customer_type.surcharge', 'customer_reservation.reservation_id')
		.where('customer_reservation.reservation_id', reservationId);
	const foreignCustomers = customers.filter(cus => cus.type === 2);
	if (foreignCustomers.length !== 0) {
		return {
			surcharge: foreignCustomers[0].surcharge,
			numOfGuests: customers.length
		};
	} else {
		return {
			surcharge: customers[0].surcharge,
			numOfGuests: customers.length
		};
	}
}
const getCustomersByReservationId = async (reservationId) => {
	try {
		const customers = await knex('customer')
			.innerJoin('customer_reservation', 'customer.id_card_number', 'customer_reservation.customer_id')
			.where('customer_reservation.reservation_id', reservationId)
			.select('id_card_number', 'name', 'address', 'type')
		return customers;
	} catch (e) {
		throw Error(e);
	}
}
module.exports = {
	getAllCustomersFromDb,
	inputCustomers,
	addCustomer,
	getSurchargeNumberByReservationId,
	getCustomersByReservationId
}
