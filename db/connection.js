const mongoose = require("mongoose");
const db = process.env.DATABASE
mongoose.connect(db).then(()=>{
    console.log("mongodb is connected")
}).catch((err) => {
    console.log("error connecting mongodb",err)

})

// mongodb+srv://akkigajbhiye1:<password>@cluster0.bzmfu.mongodb.net/