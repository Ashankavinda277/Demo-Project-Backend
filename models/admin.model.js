const mongoose = require('mongoose');
const db = mongoose.connection.useDb("cake-shop");

const adminSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    address:{type:String, required:true},
    contactNO:{type:String, required:true},
    email:{type:String, required:true, unique:true},
});

const Admin = db.model('Admin', adminSchema);
module.exports = Admin;