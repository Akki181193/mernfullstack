const jwt = require("jsonwebtoken")
const User =require("../models/userSchema")

// require("../models/userSchema") 


const Authenticate = async(req,res) => {

    try {

        const token = req.cookies.jwtoken
        console.log(token,"hi akshay your token is verify")
        const verifyToken = jwt.verify(token,env.process.SECRET_KEY)

        console.log(verifyToken)

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token})

        if(!rootUser){
            throw new Error(" User not found")}

            req.token = token;
            req.rootUser = rootUser;
            req.userID =rootUser.id;


        next();
        
    } catch (error) {
        res.status(401).send("Unauthorised: No token provided ")
        console.log(error)
    }

}

module.exports = Authenticate