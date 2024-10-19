const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class AuthService {
    static async generateToken(userData) {
        return jwt.sign(userData, process.env.SECRET_KEY, {expiresIn: '2h'});
    }
    
    static async hashPassword(password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
}
module.exports = AuthService;