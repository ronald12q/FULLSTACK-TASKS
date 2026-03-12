const mongoose = require('mongoose');



const newConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Tasks');
        console.log('mongodb was succesfull connection')
    } catch (error ) {
        console.error("Error conectando a Mongosdb", error.message);
        process.exit(1);        
    }



}

module.exports = {newConnection};