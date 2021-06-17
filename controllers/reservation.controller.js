const reservationModel = require('../models/reservation.model');
const customerModel = require('../models/customer.model');
const roomModel = require('../models/room.model');

const addReservation = async (req, res) => {
  try {
    const roomId = req.body.room_id;
    const customers = req.body.customers;
    await customerModel.inputCustomers(customers);
    const result = await reservationModel.createReservation(roomId, customers);
    if (result) {
      res.redirect("/");
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: 'cannot add reservation'
    })
  }
}

const updateReservation = async (req, res) => {
	try {
		const reservationId = req.params.reservationId;
		const roomId = req.body.room_id;
		const customers = req.body.customers;
		await customerModel.inputCustomers(customers);
		const result = await reservationModel.updateReservationById(reservationId, roomId, customers);
		if (result) {
			return res.json(result);
		}
	} catch (e) {
		console.log(e);
		res.status(400).json({
			error: 'cannot update reservation'
		})
	}
}

const getReservation = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const reservation = await reservationModel.getReservation(reservationId);
    if (reservation !== null) {
      return res.json(reservation);
    } else {
      return res.status(204).json({message: 'reservation not found'})
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: 'something went wrong'
    })
  }
}

const renderReservationsPage = async (req, res) => {
  const reservations = await reservationModel.getAll();
  console.log(reservations);

  res.render("management/index/reservation", {
    activeMenu: "reservation-item",
    reservations: reservations
  });
}

const renderNewReservationPage = async (req, res) => {
  const roomId = parseInt(req.query.roomId || -1);
  const availableRooms = await roomModel.getAvailableRooms();
  res.render("management/add/reservation", {
    activeMenu: "reservation-item",
    availableRooms: availableRooms,
    roomId: roomId
  });
}

const renderUpdateReservationPage = async (req, res) => {
  const reservationId = req.params.reservationId;
  const reservation = await reservationModel.getReservation(reservationId);
  console.log(reservation);
  const customers = await customerModel.getCustomersByReservationId(reservationId);
  const availableRooms = await roomModel.getAvailableRooms();
  res.render("management/update/reservation", {
    activeMenu: "reservation-item",
    availableRooms: availableRooms,
    customers: customers,
    reservation: reservation
  });
}

const removeReservation = async (req, res) => {
  const reservationId = req.params.reservationId;
  const ret = await reservationModel.removeReservation(reservationId);
  if (!ret) {
    return res.status(400).json({
      error_message: "reservation not found"
    });
  }
  res.json(ret);
}

module.exports = {
  addReservation,
  getReservation,
  renderReservationsPage,
  renderNewReservationPage,
  removeReservation,
  renderUpdateReservationPage,
	updateReservation
}
