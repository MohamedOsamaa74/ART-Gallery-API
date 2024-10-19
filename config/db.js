const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

 async function ConnectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Error: ', err));
}

module.exports = ConnectDB;