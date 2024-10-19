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

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const requestingUserId = req.user.id; // Assuming the user ID is stored in req.user.id

        if (!req.body) {
            return res.status(400).json({ message: "Data cannot be empty" });
        }
        if (!userId) {
            return res.status(400).json({ message: "Invalid User Id" });
        }
        if (userId !== requestingUserId) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own profile" });
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

module.exports = {
    getById,
    getAll,
    updateUser
}