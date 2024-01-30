const express=require("express")
const auth = require("../middlewares/auth.middleware")
const { getChat } = require("../controllers/chat.controllers")

const chatRouter=express.Router()
chatRouter.use(auth)

chatRouter.post("/",getChat)

module.exports=chatRouter