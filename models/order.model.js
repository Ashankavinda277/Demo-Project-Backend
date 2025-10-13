const mongoose = require('mongoose');
const db = mongoose.connection.useDb('cake-shop', { useCache: true });
require('./customer.model');
require('./product.models');

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    items:[
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name:String,
            price:Number,
            quantity:Number,
            messageOnCake:String
    }
],

    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Processing', 'Completed', 'Cancelled'], default: 'Pending' },
    deliveryAddress: { type: String, required: true },
}, { timestamps: true });


const Order = db.models.Order || db.model('Order', orderSchema);
module.exports = Order;