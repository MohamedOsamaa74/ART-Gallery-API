const user = require('../models/User');
const AuthService = require('../services/AuthService');

const register = async (req, res) => {
    const {firstName, lastName, email, password, phone, address} = req.body;
    try{
        const ValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!%*?&].{8,}$/.test(password);
        if (!ValidPassword) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
        }
        const hashedPassword = await AuthService.hashPassword(password);
        const newUser = new user.User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            address,

        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    register
}