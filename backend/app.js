const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express()
const session =require("express-session");
require("dotenv").config(); 

const port = process.env.PORT || 8070

app.use(cors());    //use cors()
app.use(bodyParser.json());     //json format

//sid.signature
app.use(session({
    secret : "mysecret",
    resave: false,             // Add this line to specify the resave option
    saveUninitialized: false    // Add this line to specify the saveUninitialized option
}));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

//mongodb configuration
const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success!");
})
const userRouter = require("./routes/users");
app.use("/user", userRouter);

//babysitter
const babysitterRouter = require("./routes/babysitters.js");
app.use("/babysitter", babysitterRouter);

//parent
const parentRouter = require("./routes/parents");
app.use("/parent", parentRouter);


//admin
const adminRouter = require("./routes/admins.js");
app.use("/admin",adminRouter);





