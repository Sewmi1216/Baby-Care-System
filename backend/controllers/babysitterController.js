let Parent = require("../models/Parent");
let User = require('../models/User')
let Task = require("../models/task");
let RequestForm = require("../models/requestForm");
const bcrypt = require("bcryptjs");
const {request} = require("express");
const multer = require("multer");
const path = require('path');
const Babysitter = require("../models/babysitter");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Upload files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName); // Set the file name to a unique value
    },
});

const uploadImage = multer({storage});

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
        } = req.body;

        // Check if the user with the same email already exists
        const userExists = await User.findOne({email: email});
        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Create a new user and save it
        const newUser = new User({
            role,
            firstName,
            lastName,
            email,
            phone,
            password,
            address,
            nic,
        });
        console.log("user: " + newUser)
        // Hash the password using bcrypt
        const saltRounds = 12;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashPassword;


        const createdUser = await newUser.save();

        // Upload image using multer
        uploadImage.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({message: 'Image upload error: ' + err.message});
            } else if (err) {
                return res.status(400).json({message: err.message});
            }

            if (!req.file) {
                console.error('No file uploaded.');
                return res.status(400).json({message: 'No file uploaded.'});
            }

            // Image successfully uploaded
            const uploadedImageFilename = req.file.filename; // Store this filename
            console.log('Success img:', uploadedImageFilename);

            // Create a new Babysitter document and save it
            const newBabysitter = new Babysitter({
                userId: createdUser._id,
                age,
                gender,
                image: uploadedImageFilename, // Use the uploaded image filename here
            });

            await newBabysitter.save();

            res.status(201).json({message: 'Babysitter added successfully'});
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error adding babysitter: ' + err.message});
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
    console.log("Tharushi")
    console.log(req.body.requestForm.isAccept);

    const isAccept = req.body.requestForm.isAccept === 1 ? 1 : 0;

    const updateRequestForm = {
        isAccept
    };

    await RequestForm.findByIdAndUpdate(requestFormId, updateRequestForm)
        .then((updateRequestForm) => {
            res.status(200).send({status: "Request form updated", updateRequestForm});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        });
}

const getRequestForms = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("babysitterID:", userId);
        const requestForms = await RequestForm.find({Babysitter: userId});

        if (!requestForms || requestForms.length === 0) {
            res.status(404).send({status: "No requestForms found for this babysitter"});
        } else {
            res.status(200).send({status: "All requestForms", requestForms});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get all requestForms", error: err.message});
    }
}

const getParents = async (req, res) => {
    await Parent.find()
    try {
        const parents = await Parent.find()
            .populate('userId', 'firstName lastName email ') // Populate the 'userId' field with 'firstName', 'lastName', and 'role' from the associated 'User' model
            .exec();
        console.log(parents)
        const parentData = parents.map((parent) => {
            return {
                userId: parent.userId._id,
                firstName: parent.userId.firstName, // Access the first name from the populated 'userId' field
                lastName: parent.userId.lastName,
                email: parent.userId.email,
            };
        });
        res.status(200).send({
            status: "All parents", parents: parentData
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with get all parents", error: err.message});
    }
}

const getRequestForm = async (req, res) => {
    try {
        let requestFormId = req.params.id;
        console.log("requestFormID:", requestFormId);

        const requestForm = await RequestForm.findById(requestFormId);

        if (!requestForm) {
            res.status(404).send({status: "No request form found for this parent"});
        } else {
            res.status(200).send({status: "request form : ", requestForm});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get all babies", error: err.message});
    }
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
    getRequestForms,
    getParents,
    getRequestForm
};