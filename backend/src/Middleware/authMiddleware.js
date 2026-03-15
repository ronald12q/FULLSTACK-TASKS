const jwt = require('jsonwebtoken');
const user = require('../models/User');

const protect = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(400).json({message: 'no autorizado'});
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await user.findById(decoded.id).select('-password');

        next();
        
    } catch (error) {
        res.status(401).json({message: 'token failed'});
        
    }
}


module.exports = {protect};