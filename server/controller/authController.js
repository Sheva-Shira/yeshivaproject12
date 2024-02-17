const User=require("../models/User")
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")

// const register=async (req,res)=>{
// const {userName,password,name,email,phone}=req.body
// if(!name||!userName||!password){
//     return res.status(400).json({message:"Missing a Field/s And All Are Required!"})
// }
// const duplicates=await User.findOne({userName:userName}).lean()
// if(duplicates){
//     return res.status(409).json({message:"This Name Already Exists and Required Unique"})
// }
// const hashedPwd= await bcrypt.hash(password,10)
// const userObject={name,userName,phone,password:hashedPwd}
// const user=await User.create(userObject)
// if(user){
//     return res.status(201).json({message:`New User created${user.userName}`})
// }
// return res.status(400).json({message:"Invalid user"})
// }


const login=async (req,res)=>{
const {userName,password}=req.body
if(!userName||!password){
    return res.status(400).json({message:"Missing a Field/s And All Are Required!"})
}
const foundUser=await User.findOne({userName:userName}).lean()

if(!foundUser||!foundUser.active){
    return res.status(401).json({message:"unauthorized"})
}
console.log(password);

const match=await bcrypt.compare(password,foundUser.password)
console.log(match);
if(!match){
    return res.status(401).json({message:"unauthorized"})
}
console.log(foundUser.userName);
console.log(foundUser.password);
console.log(foundUser.active);
const userInfo={_id:foundUser._id,name:foundUser.name,userName:foundUser.userName,role:foundUser.role,email:foundUser.email}
const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
res.json({accessToken:accessToken})
}
module.exports={login}
