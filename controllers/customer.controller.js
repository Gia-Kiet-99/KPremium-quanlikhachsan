const customerModel = require('../models/customer.model');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerModel.getAllCustomersFromDb();
        return res.json(customers);
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'something went wrong'});
    }
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
    getAllCustomers,
    addCustomer
}


