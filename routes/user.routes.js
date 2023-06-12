const express=require("express")



const{userModel}=require("../models/user.model")
//before register hash password use bycrypt
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")

require("dotenv").config()

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    //logic 
    //get all the thing from req. body
    const {name,email,pass}=req.body

    try{
      bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            }
             else{
                const user=new userModel({name,email,pass:hash})
               await user.save()
                res.json({msg:"user has been registered",user:req.body})
            }
      })
     
       
    }catch(err){
        res.json({error:err.message})

    }
})

userRouter.post("/login",async(req,res)=>{
    //logic
    const{email,pass}=req.body
    try{
      
        const user=await userModel.findOne({email})

        if(user){
             bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user._id,user:user.name},process.env.SECRET)
                    res.json({msg:"Logged In !!" ,token})
                }
                else{
                    res.json({msg:"Wrong credintials!"})
                }
             })
        }
        else{
            res.json({msg:"user does not exist!"})
        }

    }catch(err){
      res.json({error:err.message})
    }
})

module.exports={
    userRouter
}
