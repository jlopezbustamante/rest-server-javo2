const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS);
        console.log("Base de datos ON LINE");
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }
}



module.exports = {
    dbConnection
}