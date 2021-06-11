const receiptModel = require('../models/receipt.model');

const createReceipt = async (req, res) => {
  try {
    const reservationId = req.body.reservation_id;
    const receipt = await receiptModel.createReceipt(reservationId);
    return res.json(receipt);
  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'something went wrong'});
  }
}

const renderReceiptsPage = async (req, res) => {
  const receipts = await receiptModel.getAll();
  console.log(receipts);

  res.render("management/index/receipt", {
    activeMenu: "receipt-item",
    receipts: receipts
  });
}

module.exports = {
  createReceipt,
  renderReceiptsPage
}
