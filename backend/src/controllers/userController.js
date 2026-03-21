const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');


const register = async(req,res) => {
    try {
        const {username, email, password} = req.body;
        const normalizedEmail = String(email ?? '').trim().toLowerCase();

        if (!username || !normalizedEmail || !password) {
            return res.status(400).json({ message: 'username, email and password are required' });
        }

        const exists = await User.findOne({ email: normalizedEmail });
        if(exists){
            return res.status(400).json({message: 'user has already exist'});
        }

        const hash_Password = await bcrypt.hash(password, 10);

        const createdUser = await User.create({username, email: normalizedEmail, password: hash_Password});

        const token = generateToken(createdUser._id);

        res.status(201).json({
            token,
            user: { username: createdUser.username, email: createdUser.email },
        });

        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const normalizedEmail = String(email ?? '').trim().toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }

        const foundUser = await User.findOne({ email: normalizedEmail });

        if(!foundUser){
            return res.status(400).json({message: 'credentials no match'});
        }
        
        const isMatch = await bcrypt.compare(password, foundUser.password);

        if(!isMatch){
            return res.status(400).json({message: 'credentials no match'});
        }

        const token = generateToken(foundUser._id);

        res.status(200).json({
            token,
            user: { username: foundUser.username, email: foundUser.email },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

//helper 

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'});
}


module.exports = {login, register};