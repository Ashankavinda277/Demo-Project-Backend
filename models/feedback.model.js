const mongoose = require ('mongoose');
const db = mongoose.connection.useDb('cake-shop');

const feedbackSchema = new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    comment:{type:String},
    }, 
    {timestamps:true});

const Feedback = db.model('Feedback', feedbackSchema);
module.exports = Feedback;

