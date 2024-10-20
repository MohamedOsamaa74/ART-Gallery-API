const user = require('../models/User');

const getById = async (req, res) =>{
    try{
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
        const role = req.user.role;
        if(role !== 'admin'){
            return res.status(403).json({message: 'Unauthorized'});
        }
        const users = await user.User.find().select('-password');
        res.status(200).json(users);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const requestingUserId = req.user.id;
        const role = req.user.role;

        if (!req.body) {
            return res.status(400).json({ message: "Data cannot be empty" });
        }
        if (!userId) {
            return res.status(400).json({ message: "Invalid User Id" });
        }
        if (userId !== requestingUserId && role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const userById = await user.User.findById(userId);
        if (!userById) {
            return res.status(400).json({ message: "User not found" });
        }

        const updatedUser = await user.User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password');
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteUser = async (req, res) =>{
    try{
        const userId = req.params.id;
        const requestingUserId = req.user.id;
        const role = req.user.role;

        if (!userId) {
            return res.status(400).json({ message: "Invalid User Id" });
        }
        
        if (userId !== requestingUserId && role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const userById = await user.User.findById(userId);
        if (!userById) {
            return res.status(400).json({ message: "User not found" });
        }

        await user.User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    getById,
    getAll,
    updateUser,
    deleteUser
}