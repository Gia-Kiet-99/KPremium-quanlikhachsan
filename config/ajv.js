const Ajv = require('ajv');
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const roomSchema = require('../utils/schema/room.schema');
const reservationSchema = require('../utils/schema/reservation.schema.json');
const customerSchema = require('../utils/schema/customer.shema.json');
const receiptSchema = require('../utils/schema/receipt.schema.json');

ajv.addSchema(roomSchema, 'room');
ajv.addSchema(reservationSchema, 'reservation');
ajv.addSchema(customerSchema, 'customer');
ajv.addSchema(receiptSchema,'receipt');
module.exports = ajv;
