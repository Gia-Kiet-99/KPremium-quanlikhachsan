const router = require('express').Router();
const customerController = require('../controllers/customer.controller');
const validator = require('../middlewares/validator.mdw');

// render customer page
router.get('/', customerController.renderCustomersPage);
router.post('/',validator.validate('customer'), customerController.addCustomer);

module.exports = router;


