const express=require("express")
const auth = require("../middlewares/auth.middleware")
const { getChat, fetchChats, createGroup, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chat.controllers")

const chatRouter=express.Router()
chatRouter.use(auth)

chatRouter.post("/",getChat)
chatRouter.get("/",fetchChats)
chatRouter.post("/createGroup",createGroup)
chatRouter.patch("/renameGroup",renameGroup)
chatRouter.patch("/addToGroup",addToGroup)
chatRouter.patch("/removeFromGroup",removeFromGroup)
module.exports=chatRouter