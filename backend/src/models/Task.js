const mongoose = require('mongoose');
const User = require('./User');



const taskschema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required: true,

    }

}, 

{timestamps: true}
);


module.exports = mongoose.model('Tasks', taskschema );