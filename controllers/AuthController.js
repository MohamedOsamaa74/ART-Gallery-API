const user = require('../models/User');
const AuthService = require('../services/AuthService');

const register = async (req, res) => {
    const {firstName, lastName, email, password, phone, address} = req.body;
    try{
        const ValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d].{8,}$/.test(password);
        if (!ValidPassword) {
            return res.status(400).json({ statusCode: 400, error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number' });
        }
        const hashedPassword = await AuthService.hashPassword(password);
        const newUser = new user.User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone: phone || null,
            address: address || null,

        });
        const savedUser = await newUser.save();
        res.status(201).json({statusCode: 201, data : savedUser});
    }
    catch(err){
        res.status(400).json({statusCode: 400, error: err.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const existingUser = await user.User.findOne({email});
        
        if(!existingUser){
            return res.status(400).json({statusCode: 400, error: 'Invalid credentials'});
        }

        const matchingPassword = await AuthService.comparePasswords(password, existingUser.password);
        if(!matchingPassword){
            return res.status(400).json({statusCode: 400, error: 'Invalid credentials'});
        }

        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role
        }
        const token = await AuthService.generateToken(tokenData);
        res.status(200).json({statusCode: 200, Token: token, message: 'Login Successful, Welcome Back', role: existingUser.role});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    register,
    login
}