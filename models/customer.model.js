const mongoose = require('mongoose');
const db = mongoose.connection.useDb('cake-shop');

const customerSchema = new mongoose.Schema({
    Cutomer_Name: {type: String, required: true},
    Address: {type: String, required: true},
    Contact_Number: {type: String, required: true},
    Email: {type: String, required: true},
}), timestamps = true;

const Customer = db.model('Customer', customerSchema);
module .exports = Customer;