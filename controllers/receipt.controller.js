const receiptModel = require('../models/receipt.model');

const createReceipt = async(req,res)=>{
    try {
        const reservationId = req.body.reservation_id;
        const receipt = await receiptModel.createReceipt(reservationId);
        return res.json(receipt);
    } catch (e) {
        console.log(e);
        res.status(400).json({message:'something went wrong'});
    }
}


module.exports = {
    createReceipt
}
