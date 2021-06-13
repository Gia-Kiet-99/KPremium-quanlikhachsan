const db = require("../config/db");

async function getById(userId) {
  try {
    const users = await db("user").where({id: userId});
    if (users.length === 0) {
      return null;
    }
    return users[0];
  } catch (e) {
    throw Error(e);
  }
}

async function checkCredential(username, password) {
  try {
    const users = await db("user").where({
      username: username,
      password: password
    });
    console.log(users);
    if (users.length === 0) {
      return null;
    }
    return users[0];
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getById,
  checkCredential
};