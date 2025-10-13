const mongoose = require('mongoose');
// use cached connection instance for the db
const db = mongoose.connection.useDb('cake-shop', { useCache: true });

const customerSchema = new mongoose.Schema({
    Customer_Name: { type: String, required: true },
    Email: { type: String, required: true },
    Contact_Number: { type: String, required: true },
    Address: { type: String }
}, { timestamps: true });

// guard against re-registration
const Customer = db.models.Customer || db.model('Customer', customerSchema);
module.exports = Customer;