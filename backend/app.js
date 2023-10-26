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
const fs = require('fs');
const https = require('https');

// const { Server } = require("socket.io");
// const { createServer } = require('node:http');
// const server = createServer(app);
// const io = new Server();

const port = process.env.PORT || 8070
//const http = require('http').createServer(app);
// const privateKey = fs.readFileSync('C:/Users/hp/Documents/ssl/MyServer.key', 'utf8');
// const certificate = fs.readFileSync('C:/Users/hp/Documents/ssl/MyServer.crt', 'utf8');
//
// const credentials = {
//     key: privateKey,
//     cert: certificate,
// };
// const httpsServer = https.createServer(credentials);
// const ipAddress = "192.168.235.250";
// httpsServer.listen(port, ipAddress, () => {
//     console.log(`websocket server is listening on https://${ipAddress}:${port}`);
// });
// const io = require('socket.io')(httpsServer, {
//     cors: {
//         origin: ["https://192.168.235.250:4200", "https://localhost:4200"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//     },
// });
// const io = require('socket.io')(http, {
//     cors: {
//         origin: ["https://192.168.255.250:4200", "http://localhost:4200"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//     },
// });
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
const backendPort = 8070;
app.listen(backendPort, () => {
    console.log(`app is listening on port ${backendPort}`);
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




// io.on('connection', (socket) => {
//     console.log('Client connected.');
//     socket.on('videoFrame', (message) => {
//         console.log('Received video frame with ID:', message.id);
//
//         console.log('Received video frame.Data length:', message.data.length);
//         if (message.contentType === 'image/jpeg') {
//
//             const filePath = 'uploads/frame.jpeg';
//
//             fs.writeFile(filePath, message.data, (err) => {
//                 if (err) {
//                     console.error('Error saving video frame:', err);
//                 } else {
//                     console.log('Video frame saved successfully:', filePath);
//                     socket.broadcast.emit('acknowledgment', { id: message.id });
//                     socket.broadcast.emit('videoFrame', message.data);
//                 }
//             });
//             console.log('Hello video frame');
//         } else {
//             console.error('Invalid content type:', message.contentType);
//         }
//
//     });
//
//     // Handle disconnection
//     // socket.on('disconnect', () => {
//     //     console.log('A client disconnected.');
//     // });
// });

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





