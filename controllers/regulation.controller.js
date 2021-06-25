const regulationModel = require('../models/regulation.model')

const changeMaxGuest = async (req,res) => {
	try {
		const typeId = req.params.typeId;
		const maxGuestNum = req.body.maxGuestNum;
		console.log({typeId, maxGuestNum});
		const ret = await regulationModel.changeMaxGuestsOfRoom(typeId, maxGuestNum)
		return res.json(ret);
	} catch (e) {
		console.log(e);
		res.status(400).json({
			error_message: 'type id not found'
		})
	}
}

const changeSurchargeRate = async (req,res) => {
	try {
		const typeId = req.params.typeId;
		const surchargeRate = req.body.surchargeRate;
		console.log({typeId, surchargeRate});
		const ret = await regulationModel.changeRoomSurchargeRate(typeId, surchargeRate)
		return res.json(ret);
	} catch (e) {
		console.log(e);
		res.status(400).json({
			error_message: 'type id not found'
		})
	}
}

module.exports = {
	changeMaxGuest,
	changeSurchargeRate
}
