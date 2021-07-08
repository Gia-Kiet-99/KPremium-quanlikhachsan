const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');
const Validator = require('../middlewares/validator.mdw');

// render reservations page
router.get("/", reservationController.renderReservationsPage);
// render new reservation page
router.get('/new', reservationController.renderNewReservationPage);
// render update reservation by id
router.get('/by-room-id/:roomId', reservationController.renderUpdateReservationPageByRoomId);
router.get('/:reservationId', reservationController.renderUpdateReservationPage);
// create new reservation
router.post('/',
  Validator.validate('reservation'),
  reservationController.addReservation
);
//update reservation
router.patch('/:reservationId', Validator.validate('reservation'), reservationController.updateReservation);
//remove reservation
router.delete('/:reservationId', reservationController.removeReservation);

module.exports = router;
