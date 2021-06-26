const roomTypeModel = require("../models/room_type.model");
const customerTypeModel = require("../models/customerType.model")

async function renderRegulationPage(req, res) {
  const roomTypes = await roomTypeModel.getAll();
  const customerTypes = await customerTypeModel.getAll();

  res.render("management/index/regulation", {roomTypes, customerTypes});
}

module.exports = {
  renderRegulationPage
}