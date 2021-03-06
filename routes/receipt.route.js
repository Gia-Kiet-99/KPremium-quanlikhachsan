const router = require('express').Router();

const validator = require('../middlewares/validator.mdw');
const receiptController = require('../controllers/receipt.controller');

router.get("/", receiptController.renderReceiptsPage);
router.post('/', validator.validate('receipt'), receiptController.createReceipt);


module.exports = router;
