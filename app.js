const dotenv = require("dotenv");
const express = require("express");
const app = express()

dotenv.config({path:"./config.env"})
const port = process.env.PORT||5000;
require("./db/connection") 
app.use(express.json());

const User = require("./models/userSchema")

app.use(require("./router/auth"))  




// app.get("/about", (req, res) => {
//     res.send("hello from About the home side")
// });


app.get("/contact", (req, res) => {
    res.send("hello from contact the home side")
    console.log("contact page")
});

app.listen(port, () => {
    console.log(`your server is running on ${port}`)
});