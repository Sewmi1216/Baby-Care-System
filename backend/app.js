const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express()
const cookieParser = require('cookie-parser');
const cookieSession =require("cookie-session");
const multer = require('multer')
require("dotenv").config(); 

const port = process.env.PORT || 8070
app.use(cookieParser());
app.use(cors());    //use cors()
app.use(bodyParser.json());     //json format
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});
//sid.signature
// app.use(session({
//     secret : "mysecret",
//     resave: false,             // Add this line to specify the resave option
//     saveUninitialized: false ,
//     name: 'express-session',
//     cookie: {
//         httpOnly: false
//     }// Add this line to specify the saveUninitialized option
// }));
// app.use(
//     cookieSession({
//         name: "cuddlecare-session",
//         keys: ["COOKIE_SECRET"], // should use as secret environment variable
//         httpOnly: true
//     })
// );


// app.use((req, res, next) => {
//     console.log(req.session)
//     next()
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
const {request} = require("express");
app.use("/admin",adminRouter);





