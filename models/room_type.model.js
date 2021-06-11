const db = require("../config/db");

async function getAll() {
  try {
    return await db("room_type").select("type_name", "type_id");
  } catch (e) {
    throw Error(e);
  }
}

module.exports = {
  getAll
}