const musicmodel = require("../models/music.model")
const albummodel = require('../models/album.model')
const {uploadfile} = require("../Service/storage.service")

async function createmusic(req,res){
    

    const {title} = req.body;
    const file = req.file

    const result = await uploadfile(file.buffer.toString("base64"))

    const music = await musicmodel.create({
        uri:result.url,
        title,
        artist:req.user.id
    })

    res.status(201).json({
        message:"Music create sucessfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist 
        }
    })
     }


async function createalbum(req,res){
   
        const {title,musics} = req.body

        const album = await albummodel.create({
         title,
         artist:req.user.id,
         musics:musics
        })

        res.status(201).json
        ({message:"You can create successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics
            }
        })
          
    }

async function getallmusic(req,res){
    const music = await musicmodel.find().limit(3).populate("artist","username email")
        return res.status(200).json({
          message:"Musics Fetched successfully",
          musics:music
        })
    
}

async function getalbum(req,res){
    const album = await albummodel.find().select("title artist").populate("artist","username email")

    res.status(200).json({
        message:"Album fetched successfully",
        album:album
    })
}

module.exports = {createmusic,createalbum,getallmusic,getalbum}