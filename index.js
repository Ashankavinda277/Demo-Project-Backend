require('dotenv').config();
const express = require('express');
const connect = require('./config/db');
const cors = require('cors');

const app = express();
app.use(express.json());
connect();

const adminRoute = require('./routes/admin.route');
const customerRoute = require('./routes/costomer.route');
const productRoute = require('./routes/product.route');
const promotionRoute = require('./routes/promotion.routes');

app.use(cors({
    origin: 'http://localhost:5173', // Your Vite frontend URL
    credentials: true
}));

app.use('/api/admin', adminRoute);
app.use('/api/customer', customerRoute);
app.use('/api/product', productRoute);
app.use('/api/promotion', promotionRoute);



app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});