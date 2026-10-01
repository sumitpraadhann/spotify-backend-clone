const usermodel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bycrupt = require("bcrypt")

async function registeruser(req,res){
    const {username,email,password,role = "user"} = req.body  

   const isuseralreadyexist = await usermodel.findOne({
    $or:[
        {username},
        {email}
    ]
   })
     if(isuseralreadyexist){
         return res.status(409).json({messaeg:"User alreday exist"})
     }

     const hash = await bycrupt.hash(password,10)
    const user = await usermodel.create({
        username,
        email,
        password:hash,
        role
    })

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECERET)

    res.cookie("token",token)
     
    res.status(201).json({
        message:"User create successfully",
        user:{
            id:user._id,
           username:user.username,
           email:user.email,
           role:user.role
        }
    })
}

async function loginuser(req,res){
    const {username,email,password} = req.body

    const user = await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

        if (!user){
         return res.status(401).json({
            message:"Invalid"
         }) 
        }

        const ispasswordvalid = await bycrupt.compare(password,user.password)

        if(!ispasswordvalid){
            return res.status(401).json({
                message:"Invalid"
            })
        }

        const token = jwt.sign({
            id:user.id,
            role:user.role
        },process.env.JWT_SECERET)

        res.cookie("token",token)

        res.status(200).json({
            message:"User login successfulyy",
            user:{
             id:user._id,
             email:user.email,
             password:user.password,
             role:user.role
            }
        })

        
}

async function logoutusers(req,res){
            res.clearCookie("token")
            res.status(200).json({message:"User logout successfully"})
        }

module.exports = {registeruser,loginuser,logoutusers}