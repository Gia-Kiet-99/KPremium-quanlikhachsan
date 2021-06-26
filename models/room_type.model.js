const db = require("../config/db");

async function getAll() {
  try {
    return await db("room_type");
  } catch (e) {
    throw Error(e);
  }
}

module.exports = {
  getAll
}