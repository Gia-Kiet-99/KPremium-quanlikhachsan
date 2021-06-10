const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');
const Validator = require('../middlewares/validator.mdw');



router.post('/', Validator.validate('reservation'), reservationController.addReservation);
router.get('/:reservationId', reservationController.getReservation);


module.exports = router;
