const Ajv = require('ajv');
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const roomSchema = require('../utils/schema/room.schema');
const reservationSchema = require('../utils/schema/reservation.schema.json');

ajv.addSchema(roomSchema, 'room');
ajv.addSchema(reservationSchema, 'reservation');

module.exports = ajv;
