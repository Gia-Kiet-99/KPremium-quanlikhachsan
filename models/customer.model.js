const knex = require('../config/db');

const getAllCustomersFromDb = () => {
    return knex('customer');
}

const isExist = async (customerIdCardNum) => {
    const customer = await knex('customer').where("id_card_number", customerIdCardNum);
    return customer;
}

const addCustomer = async (customerData) => {
    const customer = await knex('customer').insert(customerData);
    return customer;
}

const inputCustomers = async (customers) => {
    const ids = customers.map(customer => customer.id_card_number);
    const resCustomers = await knex('customer').whereIn("id_card_number", ids).select("id_card_number");
    const existedIds = resCustomers.map(customer => customer.id_card_number);
    const toAddCustomers = customers.filter(customer => !existedIds.includes(customer.id_card_number));
    if (toAddCustomers.length !== 0) {
        await knex('customer').insert(toAddCustomers);
    }
}
module.exports = {getAllCustomersFromDb, inputCustomers}
