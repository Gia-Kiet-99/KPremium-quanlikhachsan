const regulationModel = require('../models/regulation.model')
const roomTypeModel = require("../models/room_type.model");
const customerTypeModel = require("../models/customerType.model")

async function renderRegulationPage(req, res) {
  const roomTypes = await roomTypeModel.getAll();
  const customerTypes = await customerTypeModel.getAll();

  roomTypes.forEach(type => {
    type.surcharge_rate *= 100;
  });

  res.render("management/index/regulation", {
    roomTypes,
    customerTypes,
    activeMenu: "regulation-item"
  });
}

async function renderNewRoomTypePage(req, res) {
  res.render("management/add/roomType", {
    activeMenu: "regulation-item"
  });
}

async function createRoomType(req, res) {
  const info = req.body;
  await roomTypeModel.add(info);
  res.json(info);
}

async function renderUpdatePage(req, res, next) {
  const id = req.params.typeId || -1;

  const roomType = await roomTypeModel.getById(id);
  if (!roomType) {
    next();
  }
  res.render("management/update/roomType", {
    activeMenu: "regulation-item",
    roomType
  });
}

async function updateRoomType(req, res) {
  const id = req.params.typeId;
  const dataToUpdate = req.body;

  const ret = await roomTypeModel.update(id, dataToUpdate);

  res.json(ret);
}

async function removeRoomType(req, res) {
  const typeId = req.params.typeId;
  const ret = await roomTypeModel.remove(typeId);
  res.json(ret);
}

async function renderNewCustomerTypePage(req, res) {
  res.render("management/add/customerType", {
    activeMenu: "regulation-item"
  })
}

async function createCustomerType(req, res) {
  const info = req.body;
  const ret = await customerTypeModel.add(info);
  res.json(ret);
}

async function renderUpdateCustomerTypePage(req, res, next) {
  const typeId = req.params.typeId;

  const customerType = await customerTypeModel.getById(typeId);
  if (!customerType) {
    next();
  }
  res.render("management/update/customerType", {
    activeMenu: "regulation-item",
    customerType
  });
}

async function updateCustomerType(req, res) {
  const typeId = req.params.typeId;
  const dataToUpdate = req.body;

  const ret = await customerTypeModel.update(typeId, dataToUpdate);
  res.json(ret);
}

async function removeCustomerType(req, res) {
  const typeId = req.params.typeId;
  const ret = await customerTypeModel.remove(typeId);
  res.json(ret);
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
  createRoomType,
  renderUpdatePage,
  updateRoomType,
  removeRoomType,
  renderNewCustomerTypePage,
  createCustomerType,
  renderUpdateCustomerTypePage,
  updateCustomerType,
  removeCustomerType
}
