const knex = require('../config/db');
const roomModel = require('../models/room.model');
const CONST = require('../config/contraint');

const createReservation = async (roomId, customers) => {
  try {
    if (await roomModel.checkIfAvailable(roomId)) {
      await roomModel.checkInRoom(roomId);
      const newReservation = await knex('reservation').insert({
        room_id: roomId,
        check_in_time: new Date(),
        status: CONST.RESERVATION_STATUS.UNPAID
      });
      const newReservationId = newReservation[0];
      const cusResdata = customers.reduce((array, cus) => {
        // array.push({customer_id: cus.id_card_number, reservation_id: newReservationId});
        return [...array, {customer_id: cus.id_card_number, reservation_id: newReservationId}];
      }, []);
      const res = await knex('customer_reservation').insert(cusResdata);
      if (res) {
        return {message: 'reservation created'};
      }
    } else {
      console.log('room not available');
      return {message: 'room not available'};
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

const getReservation = async (reservationId) => {
  const reservations = await knex('reservation')
    .innerJoin('room', 'reservation.room_id', 'room.room_id')
    .innerJoin('room_type', 'room.room_type', 'room_type.type_id')
    .where("reservation.id", reservationId)
    .select('room_name', 'id', 'reservation.status', 'reservation.room_id', 'check_in_time', 'room_type.max_of_customer');
  if (reservations.length !== 0) {
    return reservations[0];
  }
  return null;
}

const isUnpaid = async (reservationId) => {
  const res = await knex('reservation')
    .where('id', reservationId)
    .select('status');
  console.log(res);
  const status = res[0].status;
  return status === CONST.RESERVATION_STATUS.UNPAID;
}

const preparePayment = async (reservationId) => {
  const reservation = await getReservation(reservationId);
  if (reservation !== null) {
    if (reservation.status === CONST.RESERVATION_STATUS.UNPAID) {
      const {roomRate, surchargeRate} = await roomModel.checkOutRoom(reservation.room_id);
      await knex('reservation')
        .update({status: CONST.RESERVATION_STATUS.PAID})
        .where('id', reservationId);
      return {roomRate: roomRate, surchargeRate: surchargeRate, check_in_time: reservation.check_in_time};
    }
  }
  return null;
}

const getAll = async () => {
  try {
    return await knex("reservation")
      .innerJoin("room", "reservation.room_id", "room.room_id")
      .select("id", "room_name", "check_in_time", "reservation.status");
  } catch (e) {
    throw Error(e);
  }
}

const removeReservation = async (reservationId) => {
  try {
    const reservation = await getReservation(reservationId);
    await roomModel.checkOutRoom(reservation.room_id);
    await knex('customer_reservation').where('reservation_id', reservationId).del();
    return await knex("reservation").where("id", reservationId).del();
  } catch (e) {
    throw Error(e);
  }
}

const updateReservationById = async (reservationId, roomId, customers) => {
  try {
    const reservation = await getReservation(reservationId);
    if (reservation.room_id !== roomId) {
      await roomModel.checkOutRoom(reservation.room_id);
      await roomModel.checkInRoom(roomId);
    }
    await knex('customer_reservation').where('reservation_id', reservationId).del();
    const cusResdata = customers.reduce((array, cus) => {
      return [...array, {customer_id: cus.id_card_number, reservation_id: reservationId}];
    }, []);
    await knex('customer_reservation').insert(cusResdata);
    const res = await knex('reservation').update({room_id: roomId}).where('id', reservationId);
    if (res) {
      console.log('updated');
      return {message: 'reservation updated'};
    }
  } catch (e) {
    throw Error(e);
  }
}

const getReservationByRoomId = async (roomId) => {
  try {
    const reservations = await knex("reservation")
      .innerJoin('room', 'reservation.room_id', 'room.room_id')
      .innerJoin('room_type', 'room.room_type', 'room_type.type_id')
      .where("reservation.room_id", roomId).andWhere("reservation.status", "Unpaid")
      .select('room_name', 'id', 'reservation.status', 'reservation.room_id', 'check_in_time', 'room_type.max_of_customer');
    if (reservations.length > 0) {
      return reservations[0];
    }
  } catch (e) {
    throw Error(e);
  }
}

module.exports = {
  createReservation,
  getReservation,
  isUnpaid,
  preparePayment,
  getAll,
  removeReservation,
  updateReservationById,
  getReservationByRoomId
}
