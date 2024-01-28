const express=require("express")
const connectDB = require("./config/db")
require("dotenv").config()
const cors=require('cors')

const app=express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("chatting......")
})

connectDB()
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port:-${process.env.PORT}`);
})