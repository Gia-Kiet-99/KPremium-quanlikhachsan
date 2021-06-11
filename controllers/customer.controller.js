const customerModel = require('../models/customer.model');

const renderCustomersPage = async (req, res) => {
  const customers = await customerModel.getAllCustomersFromDb();
  console.log(customers);

  res.render("management/index/customer", {
    activeMenu: "customer-item",
    customers: customers
  });
}
const addCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const customer = await customerModel.addCustomer(customerData);
    if (customer !== null) {
      return res.status(201).json(customer);
    } else {
      return res.json({message: 'customer existed'})
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'cannot add customer'});
  }
}

module.exports = {
  renderCustomersPage,
  addCustomer,
  renderCustomersPage
}


