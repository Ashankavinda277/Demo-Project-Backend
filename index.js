require('dotenv').config();
const express = require('express');
const connect = require('./config/db');

const app = express();
app.use(express.json());
connect();

const adminRoute = require('./routes/admin.route');
const customerRoute = require('./routes/costomer.route');
const productRoute = require('./routes/product.route');

app.use('/api/admin', adminRoute);
app.use('/api/customer', customerRoute);
app.use('/api/product', productRoute);



app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});