const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');
const Validator = require('../middlewares/validator.mdw');

// render reservations page
router.get("/", reservationController.renderReservationsPage);

router.get('/new', reservationController.renderNewReservationPage);

// create new reservation
router.post('/',
  Validator.validate('reservation'),
  reservationController.addReservation
);

// get reservation by id
router.get('/:reservationId', reservationController.getReservation);

//
router.delete('/:reservationId', reservationController.removeReservation);

module.exports = router;
