const express = require('express');
require("dotenv").config();
const connect = require("./config/db");

const app = express();
app.use(express.json());

connect();


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});