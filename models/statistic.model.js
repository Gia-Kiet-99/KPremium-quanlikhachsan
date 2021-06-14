const db = require("../config/db");

const getMonthlyRevenue = async (month, year) => {
  try {
    return await db("receipt").whereRaw("month(check_out_time)=? and year(check_out_time)=?", [month, year])
      .innerJoin("reservation", "receipt.reservation_id", "reservation.id")
      .innerJoin("room", "reservation.room_id", "room.room_id")
      .innerJoin('room_type', 'room.room_type', 'room_type.type_id')
      .select("receipt.id", "room_name", "type_name", "check_in_time", "check_out_time", "total_price");
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getMonthlyRevenue
}