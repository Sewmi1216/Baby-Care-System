const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express()
require("dotenv").config();

const port = process.env.PORT || 8070

app.use(cors());    //use cors()
app.use(bodyParser.json());     //json format

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

//babysitter
const babysitterRouter = require("./routes/babysitters.js");
app.use("/babysitter", babysitterRouter);

//parent
const parentRouter = require("./routes/parents");
app.use("/parent", parentRouter);

//task
const taskRouter = require("./routes/tasks.js");
app.use("/task",taskRouter);

