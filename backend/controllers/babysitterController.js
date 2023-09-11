let Babysitter = require("../models/babysitter");
let User = require('../models/User')
let Task = require("../models/task");
let RequestForm = require("../models/requestForm");
const bcrypt = require("bcryptjs");
const {request} = require("express");
const multer = require("multer");
const path = require('path');

// Define the multer storage and fileFilter outside the function
// const fileStorage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
//     }
// });
//
// const uploadImage = multer({
//     storage: fileStorage,
//     limits: {
//         fileSize: 1000000 // Adjust as needed
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg)$/)) {
//             return cb(new Error('Please upload an image file with .png or .jpg extension!'));
//         }
//         cb(null, true);
//     }
// });

const addBabysitter = async (req, res) => {
    try {
        const {
            role,
            firstName,
            lastName,
            email,
            phone,
            address,
            password,
            nic,
            age,
            gender,
            image
        } = req.body;

        const userExists = await User.findOne({email: email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = new User({
            role,
            firstName,
            lastName,
            email,
            phone,
            address,
            nic
        });
        const saltRounds = 12;
        console.log("Password:", password);
        console.log("Salt Rounds:", saltRounds);

        const hashPassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashPassword;

        const createdUser = await newUser.save();

        // Upload image using multer
        uploadImage.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({message: "Image upload error: " + err.message});
            } else if (err) {
                return res.status(400).json({message: err.message});
            }
            console.log('success img')
            // Image successfully uploaded
            const image = req.file.filename; // Store this filename in the Babysitter model
        });

        const newBabysitter = new Babysitter({
            userId: createdUser._id,
            age,
            gender,
            image // Store the filename here
        });

        await newBabysitter.save();

        res.status(201).json({message: "Babysitter added successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error adding babysitter" + err.message});
    }
};


const getAllbabysitters = async (req, res) => {
    await Babysitter.find()
        .then((babysitters) => {
            res.status(200).send({status: "All babysitters", babysitters});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with get all babysitters", error: err.message});
        });
};


const getBabysitter = async (req, res) => {
    let userId = req.params.id;

    await Babysitter.findById(userId)
        .then((babysitter) => {
            res.status(200).send({status: "Babysitter fetched", babysitter});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with get user", error: err.message});
        });
};

const updateBabysitter = async (req, res) => {
    let userId = req.params.id; //fetch the id

    const {
        fname,
        lname,
        age,
        address,
        nic,
        gender,
        password,
        email,
        contactNumber,
        qualifications,
        verificationDetails
    } = req.body; // new value

    const updateBabysitter = {
        fname,
        lname,
        age,
        address,
        nic,
        gender,
        password,
        email,
        contactNumber,
        qualifications,
        verificationDetails
    };

    await Babysitter.findByIdAndUpdate(userId, updateBabysitter)
        .then((babysitter) => {
            res.status(200).send({status: "Babysitter updated", babysitter});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        });
};

const deleteBabysitter = async (req, res) => {
    let userId = req.params.id;

    await Babysitter.findByIdAndDelete(userId)
        .then((babysitter) => {
            res.status(200).send({status: "User Deleted", babysitter});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with delete user", error: err.message});
        });
};


const getAllTasks = async (req, res) => {
    await Task.find()
        .then((tasks) => {
            res.status(200).send({status: "All tasks", tasks});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with get all tasks", error: err.message});
        })
}

const updateTask = async (req, res) => {
    let taskId = req.params.id; //fetch the id

    const {taskCompletedStatus} = req.body; // new value

    const updateTask = {
        taskCompletedStatus
    };

    await Task.findByIdAndUpdate(taskId, updateTask)
        .then((task) => {
            res.status(200).send({status: "Task updated", task});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        });
};

const getAllRequestForm = async (req, res) => {
    await RequestForm.find()
        .then((requestForm) => {
            res.status(200).send({status: "All request form", requestForm})
        })
        .catch((err) => {
            res.status(500).send({status: "Error with get all request form", error: err.message})
        })
}

const updateRequestForm = async (req, res) => {
    let requestFormId = req.params.id;

    const {isAccept} = req.body;

    const updateRequestForm = {
        isAccept
    };

    await RequestForm.findByIdAndUpdate(requestFormId, updateRequestForm)
        .then((requestForm) => {
            res.status(200).send({status: "Request form updated", requestForm});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        });
}

const getRequestForm = async (req, res) => {
    let requestFormId = req.params.id;

    await RequestForm.findById(requestFormId)
        .then((requestForm) => {
            res.status(200).send({status: "Request form fetched", requestForm})
        })
        .catch((err) => {
            res.status(500).send({status: "Error with get request form", error: err.message})
        })
}

module.exports = {
    getAllbabysitters,
    addBabysitter,
    getBabysitter,
    updateBabysitter,
    deleteBabysitter,
    getAllTasks,
    updateTask,
    getAllRequestForm,
    updateRequestForm,
    getRequestForm,
};