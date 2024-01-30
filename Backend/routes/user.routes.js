const express=require("express")
const { registerUser, loginUser, getUser } = require("../controllers/user.controllers")
const auth=require("../middlewares/auth.middleware")
const userRouter=express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/",auth,getUser)

module.exports=userRouter