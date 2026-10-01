const jwt = require("jsonwebtoken")

async function authartist(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECERET)
        if(decode.role !== "artist"){
            return res.status(403).json({message:"You don't have access"})
        }

        req.user = decode

        next()

    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}


async function authuser(req,res,next){
    const token  = req.cookies.token
    if(!token){
        res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECERET)

        if(!decode.role === "user"){
            res.status(403).json({message:"You don't have access"})
        }

        req.user = decode

        next()
    }catch(err){
       res.status(401).json({message:'Unauthorized'})
    }
}

module.exports = {authartist,authuser}