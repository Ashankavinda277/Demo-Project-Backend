const { Double } = require('bson');
const mongoose = require('mongoose');
const db = mongoose.connection.useDb('cake-shop');

const productSchema = new mongoose.Schema({
    Product_Name: {type: String, required: true},
    Product_Type: {type: String, required: true},
    Price: {type: Number, required: true},
    Description: {type: String, required: true},
    Weight: {type: Double, required: true},
    status: {type: String},
  image: { 
        type: String,
        default: 'https://via.placeholder.com/400'
    },
    imagePublicId: { 
        type: String 
    }
      
}), timestamps = true;

const Product = db.model('Product', productSchema);
module.exports = Product;