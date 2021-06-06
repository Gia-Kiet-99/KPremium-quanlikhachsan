const Ajv = require('ajv');
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const roomSchema = require('../utils/schema/room.schema');


ajv.addSchema(roomSchema, 'room');

module.exports = ajv;
