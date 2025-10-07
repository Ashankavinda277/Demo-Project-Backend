require('dotenv').config();
const express = require('express');
const connect = require('./config/db');

const app = express();
app.use(express.json());

connect();

const adminRoute = require('./routes/admin.route');

app.use('/api/admin', adminRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});