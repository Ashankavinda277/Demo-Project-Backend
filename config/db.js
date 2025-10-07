const mongoose = require('mongoose');

const URI = process.env.URL

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Connected successfully");
    } catch (e) {
        console.log(e);
    }
}

module.exports = connectDB;