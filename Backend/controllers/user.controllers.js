const bcrypt=require("bcrypt")
const UserModel = require("../models/user.model")
const { generateToken } = require("../config/token")

const registerUser=async(req,res)=>{
    const {name,email,password,pic}=req.body 
    if(!name||!email||!password){
        res.status(400).json({msg:"Please Enter Valid Credentials!"})
        return
    }
    try {
        const user=await UserModel.findOne({email})
        if(!user){
            bcrypt.hash(password, 3, async (err, hash) =>{
              // Store hash in your password DB.
              if(err){
                res.status(400).json({msg:err.message})
                return
              }
              const newUser= new UserModel({name,email,password:hash,pic})
              newUser.save()
              const token=generateToken(newUser._id)
              res.status(200).json({msg:"User Has Been Added Successfully!",newUser,token})
            });
        }else{
            res.status(200).json({msg:"User Already Exist!"})
        }
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(400).json({msg:"Please Enter Valid Credentials"})
        return
    }
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function (err, result) {
              // result == true
              if(result){
                const token=generateToken(user._id)
                res.status(200).json({msg:"Login Successfull",user,token})
              }else{
                res.status(400).json({msg:"Please Check Your Password"})
              }
            });
        }else{
            res.status(200).json({msg:"User Doesn't Exist!!"})
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const getUser=async(req,res)=>{
    //console.log(req.user)
    const keyword=req.query.search?
        {
            $or:[
                {name:{$regex:req.query.search,$options:'i'}},
                {email:{$regex:req.query.search,$options:'i'}}
            ]
        }
    :{}
    try {
       const users=await UserModel.find(keyword).find({_id:{$ne:req.user._id}})
       res.status(200).json({msg:users})
    } catch (error) {
       res.status(400).json({ msg: error.message }); 
    }
}

module.exports={registerUser,loginUser,getUser}