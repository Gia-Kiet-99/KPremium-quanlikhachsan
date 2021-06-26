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

module.exports = {
  getAll, add
}