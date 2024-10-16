const mongoose = require('mongoose');

 async function ConnectDB() {
    mongoose.connect('mongodb://localhost:27017/ART-Gallery-DB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Error: ', err));
}

module.exports = ConnectDB;