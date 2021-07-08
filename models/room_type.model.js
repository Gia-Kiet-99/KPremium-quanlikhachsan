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

async function getById(id) {
  try {
    const result = await db("room_type").where({type_id: id});
    if (result.length > 0) {
      return result[0];
    }
    return null;
  } catch (e) {
    throw Error(e);
  }
}

async function update(typeId, dataToUpdate) {
  try {
    const ret = await db("room_type").where({type_id: typeId})
      .update(dataToUpdate);
    console.log(ret);
    return ret;
  } catch (e) {
    throw Error(e);
  }
}

async function remove(typeId) {
  try {
    return await db("room_type").where({type_id: typeId}).delete();
  } catch (e) {
    throw Error(e);
  }
}

module.exports = {
  getAll, add, getById, update, remove
}