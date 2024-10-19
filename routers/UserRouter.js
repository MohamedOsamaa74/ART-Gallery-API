const route = require('express').Router();
const UserController = require('../controllers/UserController');

route.get('/getById/:id', UserController.getById);
route.get('/getAll', UserController.getAll);
module.exports = route;