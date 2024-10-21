const route = require('express').Router();
const UserController = require('../controllers/UserController');
const verifyToken = require('../middlewares/jwt');

route.get('/getById/:id', UserController.getById);
route.get('/getAll',verifyToken,UserController.getAll);
route.put('/update/:id', verifyToken, UserController.updateUser);
route.delete('/delete/:id', verifyToken, UserController.deleteUser);

module.exports = route;