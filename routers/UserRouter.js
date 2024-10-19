const route = require('express').Router();
const UserController = require('../controllers/UserController');
const verifyToken = require('../middlewares/jwt');

route.get('/getById/:id', UserController.getById);
route.get('/getAll', UserController.getAll);
route.put('/update/:id', verifyToken, UserController.updateUser);


module.exports = route;