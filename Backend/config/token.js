const jwt=require("jsonwebtoken")
require("dotenv").config()

const generateToken=(userId)=>{
 return jwt.sign({ userId}, process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
}

const validateToken=()=>{

}

module.exports={generateToken,validateToken}