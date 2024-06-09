const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
})






userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified("password")){
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(12)
        const hash_password = await bcrypt.hash(user.password, saltRound)
        user.password = hash_password
        const hash_cpassword = await bcrypt.hash(user.cpassword, saltRound)
        user.cpassword = hash_cpassword
    } catch (error) {
        next(error)
        
    }
     console.log("hash is running");
})

userSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        
        this.tokens = this.tokens.concat({token: token})
        await this.save()
        return token;
    } catch (error) {
        console.log(error) 
    }
}


const User = mongoose.model("User",userSchema);

module.exports = User;