require('dotenv').config();
const mongoose = require('mongoose');
const DBURL = process.env.URL;

mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected securely");
}).catch((err) => {
    console.log(err);
});