const mongoose = require('mongoose');


module.exports = mongoose.model('Users', userschema);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
},
{timestamps: true}

)


module.exports = mongoose.model('Users', userSchema);

