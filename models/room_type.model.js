const db = require("../config/db");

async function getAll() {
  try {
    return await db("room_type");
  } catch (e) {
    throw Error(e);
  }
}

async function add(info) {
  try {
    return await db("room_type").insert({
      type_name: info.typeName,
      room_rate: info.roomRate,
      max_of_customer: info.maxCustomer,
      surcharge_rate: info.surchargeRate
    });
  } catch (e) {
    throw Error(e);
  }
}

module.exports = {
  getAll, add
}