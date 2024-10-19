const user = require('../models/User');

const getById = async (req, res) =>{
    try{
        console.log(req.params);
        const userId = req.params.id;
        const userById = await user.User.findById(userId).select('-password');
        res.status(200).json(userById);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const getAll = async (req, res) =>{
    try{
        const users = await user.User.find().select('-password');
        res.status(200).json(users);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}
module.exports = {
    getById,
    getAll
}