const express = require("express")
const router = express.Router();
require("../db/connection")
const User = require("../models/userSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const authenticate = require("../middleware/authenticate")

router.get("/", (req,res) => {
    res.send("hello from the auth.js. hi akshay gajbhiye")
})

router.post("/register", async(req,res) => {
    const {name, email, phone, work, password, cpassword} = req.body
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({ error: "plz filled the field properly"})
    }


    try {
             
      const userExist = await User.findOne({email:email});
            if(userExist){
            return res.status(422).json({ error: "Email already exist"})
            }
            else if(password!=cpassword){
                return res.status(422).json({error: "password id not matching"})
            }
            else{

                const user = new User({name, email, phone, work, password, cpassword})
    
             const userRigister = await user.save()
             res.status(200).json({message:"singup successfully"})

            }

        
    } catch (error) {
        console.log("postman error",error)
    }

    
})

router.post("/signin",async(req,res) => {
    try {
      let token;
    const { email, password } = req.body
    
    if(!email || !password){
        res.status(400).json({error:"enter the feild"})
    }
                // check Email is vaild in login or not

const userLogin = await User.findOne({email:email});
console.log(userLogin)
// if(!userLogin){
//     res.status(400).json({message:"Invaild User details"})
// }else{
//     res.status(200).json({message:" User Login Email successfully"})
// }

                // check password is vaild in login or not  
    
        if(userLogin){
            const comPass = await bcrypt.compare(password, userLogin.password)
             token = await userLogin.generateAuthToken();
            console.log(token)

            res.cookie("jwtoken", token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })

    if(!comPass){
        res.status(400).json({message:"Invaild User password details"})
    }else{
        res.status(200).json({message:" User Login password successfully"})
    }
        }else{
        res.json({error: "invalid credentials"})
    }
    
  } catch (error) {
    console.log(error)
  }

})

router.get("/about", authenticate, (req, res) => {
    console.log("welcome to about page")
    res.send(req.rootUser)

})

module.exports = router;