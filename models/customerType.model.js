const db = require("../config/db");

async function getAll() {
  try {
    return await db("customer_type");
  } catch (e) {
    throw Error(e);
  }
}

async function add(info) {
  try {
    return await db("customer_type").insert(info);
  } catch (e) {
    throw Error(e);
  }
}

async function getById(typeId) {
  try {
    const ret = await db("customer_type").where({type_id: typeId});
    if (ret.length > 0) {
      return ret[0];
    }
    return null;
  } catch (e) {
    throw Error(e);
  }
}

async function update(typeId, dataToUpdate) {
  try {
    return await db("customer_type").where({type_id: typeId})
      .update(dataToUpdate);
  } catch (e) {
    throw Error(e);
  }
}

async function remove(typeId) {
  try {
    return await db("customer_type").where({type_id: typeId})
      .delete();
  } catch (e) {
    throw Error(e);
  }
}

module.exports = {
  getAll, add, getById, update, remove
}