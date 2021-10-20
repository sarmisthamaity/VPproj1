const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const connection = require('./database/connection');
const userRoute = require('./routes/index');

app.use('/', userRoute);


app.listen(process.env.PORT, () => {
    console.log(`port number is ${process.env.PORT}`);
});