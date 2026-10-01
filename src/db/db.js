const mongoose = require("mongoose")

async function connectdb() {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase connection Successfully")

    }catch(err){
        console.log("DataBase connection error")
    }
}

module.exports = connectdb