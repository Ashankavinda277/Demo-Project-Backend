const mongoose = require('mongoose');
const db = mongoose.connection.useDb('cake-shop');

const promotionSchema = new mongoose.Schema({
    Promotion_Name:{type: String, required: true},
    // Promotion_Type:{type:String, required:true},
    Discount_Price:{type:Number, required:true},
    // Start_Date:{type:Date, required:true},
    End_Date:{type:Date, required:true},
    Description:{type:String, required:true},
     Weight:{type:String, required:true},
    Icon:{type:String, required:true},
    Current_Price:{type:Number, required:true}  
});
const Promotion = db.model('Promotion', promotionSchema);
module.exports = Promotion;
