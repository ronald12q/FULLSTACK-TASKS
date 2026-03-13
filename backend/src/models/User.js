const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    name: {
        type:string,
        required:true,
        trim: true
    },
    email:{
        type:string,
        required: true,
        unique:true,
        lowercase:true
    },
    password: {
        type:string,
        required:true,
        minlength:6
    }  

},
{timestamps: true}
);


module.exports = mongoose.model('Users', userschema);