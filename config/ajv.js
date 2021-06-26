const Ajv = require('ajv');
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const roomSchema = require('../utils/schema/room.schema');
const reservationSchema = require('../utils/schema/reservation.schema.json');
const customerSchema = require('../utils/schema/customer.shema.json');
const receiptSchema = require('../utils/schema/receipt.schema.json');
const roomTypeSchema = require("../utils/schema/room_type.schema.json");

ajv.addSchema(roomSchema, 'room');
ajv.addSchema(reservationSchema, 'reservation');
ajv.addSchema(customerSchema, 'customer');
ajv.addSchema(receiptSchema,'receipt');
ajv.addSchema(roomTypeSchema,'roomType');


module.exports = ajv;
