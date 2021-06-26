const regulationModel = require('../models/regulation.model')
const roomTypeModel = require("../models/room_type.model");
const customerTypeModel = require("../models/customerType.model")

async function renderRegulationPage(req, res) {
  const roomTypes = await roomTypeModel.getAll();
  const customerTypes = await customerTypeModel.getAll();

  res.render("management/index/regulation", {
    roomTypes,
    customerTypes,
    activeMenu: "regulation-item"
  });
}

async function renderNewRoomTypePage(req, res) {
  res.render("management/add/regulation", {
    activeMenu: "regulation-item"
  });
}

async function createRoomType(req, res) {
  const info = req.body;
  await roomTypeModel.add(info);
  res.json(info);
}

const changeMaxGuest = async (req, res) => {
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

const changeSurchargeRate = async (req, res) => {
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

const changeRoomRate = async (req, res) => {
  try {
    const typeId = req.params.typeId;
    const newRoomRate = req.body.roomRate;
    console.log({typeId, newRoomRate});
    const ret = await regulationModel.changeRoomRate(typeId, newRoomRate);
    return res.json(ret);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error_message: 'type id not found'
    })
  }
}

const changeCustomerSurchargeRate = async (req, res) => {
  try {
    const typeId = req.params.typeId;
    const surchargeRate = req.body.surchargeRate;
    console.log({typeId, surchargeRate});
    const ret = await regulationModel.changeCustomerSurchargeRate(typeId, surchargeRate)
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
  changeSurchargeRate,
  changeRoomRate,
  changeCustomerSurchargeRate,
  renderRegulationPage,
  renderNewRoomTypePage,
  createRoomType
}
