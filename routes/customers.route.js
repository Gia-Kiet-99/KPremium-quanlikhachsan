const router = require('express').Router();
const customerController = require('../controllers/customer.controller');
const validator = require('../middlewares/validator.mdw');

router.get('/', customerController.getAllCustomers);
router.post('/',validator.validate('customer'), customerController.addCustomer);

module.exports = router;


