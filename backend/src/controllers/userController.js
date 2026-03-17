const user = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');


const register = async(req,res) => {
    try {
        const {username,email, password} = req.body;

        const exists = await user.findOne([email]);
        if(exists){
            return res.status(400).json({message: 'user has already exist'});
        }

        const hash_Password = await bcrypt.hash(password, 10);

        const User = await user.create({username, email, password: hash_Password});

        const token = generateToken(User._id);

        res.status(201).json({token, user: {username: user.username, email: user.email}});

        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await user.findOne([email]);

    if(!user){
        return res.status(400).json({message: 'credentials no match'});
    }
    
    const isMath = await bcrypt.compare(password, user.password);

    if(!isMath){
        return res.json(400).json({message: 'credentials no match'})
    }

    const token = generateToken(user._id);

    res.status(201).json({token});
}

//helper 

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'});
}


module.exports = {login, register};