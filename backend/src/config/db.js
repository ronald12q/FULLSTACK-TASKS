const mongoose = require('mongoose');



const newConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL);
        console.log('mongodb was succesfull connection')
    } catch (error ) {
        console.error("Error conectando a Mongosdb", error.message);
        process.exit(1);        
    }



}

module.exports = {newConnection};