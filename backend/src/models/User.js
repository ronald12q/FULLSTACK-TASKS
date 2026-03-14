const mongoose = require('mongoose');


module.exports = mongoose.model('Users', userschema);

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true
    },
    email: {
        type:string,
        required:true,
        unique: true,
        lowercase: true
    },
    password: {
        type:string,
        required: true,
        minlength: 6
    }
},
{timestamps: true}

)


module.exports = mongoose.model('Users', userSchema);

