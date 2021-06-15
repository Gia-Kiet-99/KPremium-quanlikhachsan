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

const getRoomUsageDensity = async (month, year) => {
  let ret = [];
  try {
    const receipts = await db("receipt").whereRaw("month(check_out_time)=? and year(check_out_time)=?", [month, year])
      .innerJoin("reservation", "receipt.reservation_id", "reservation.id")
      .innerJoin("room", "reservation.room_id", "room.room_id")
      .select("room_name", "check_in_time", "check_out_time");

    if (receipts) {
      const data = receipts.reduce((result, value) => {
        const startDay = new Date(value.check_in_time).getTime();
        const endDay = new Date(value.check_out_time).getTime();
        const duration = endDay - startDay;
        if (result.hasOwnProperty(value.room_name)) {
          result[value.room_name].duration += duration;
        } else {
          result[value.room_name] = duration;
        }
        return result;
      }, {});
      // console.log(data);

      const totalDuration = Object.values(data).reduce((sum, value) => {
        return sum += value;
      }, 0);
      for (const roomName of Object.keys(data)) {
        ret.push({
          roomName: roomName,
          duration: Math.round((data[roomName] / (24 * 60 * 60 * 1000)) * 100) / 100,
          ratio: Math.round((data[roomName] / totalDuration) * 100) / 100
        })
      }
    }

  } catch (e) {
    throw new Error(e);
  }
  return ret;
}

module.exports = {
  getMonthlyRevenue,
  getRoomUsageDensity
}