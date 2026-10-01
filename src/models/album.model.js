const mongoose = require("mongoose")

const albumsschema = new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music",
     }],

     artist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true 
     }
})

const albummodel = mongoose.model("album",albumsschema)

module.exports = albummodel