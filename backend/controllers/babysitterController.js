let Parent = require("../models/Parent");
let User = require('../models/User')
let Task = require("../models/task");
let RequestForm = require("../models/requestForm");
const bcrypt = require("bcryptjs");
const {request} = require("express");
const multer = require("multer");
const path = require('path');
const Babysitter = require("../models/babysitter");
const TaskListForm = require("../models/tasklist");



const addBabysitter = async (req, res) => {
    try {
        const role = req.body.role;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const religion = req.body.religion;
        const language = req.body.language;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const password = req.body.cpassword;
        const nic = req.body.nic;
        const age = Number(req.body.age);
        const gender = req.body.gender;
        const images = req.files.map(file => ({ filename: file.filename }));

        // Check if the user with the same email already exists
        const userExists = await User.findOne({email: email});
        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
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
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        newUser.password = hashedPassword;

        const createdUser = await newUser.save();

        const newBabysitter = new Babysitter({
            userId: createdUser._id,
            age,
            gender,
            religion,
            language,
            qualifications: images,
        });

        await newBabysitter.save();

        res.status(201).json({message: "Babysitter added successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "An error occurred"});
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
    console.log(req.body.requestForm);

    const isAccept = req.body.requestForm.isAccept === 1 ? 1 : 0;
    const reason = req.body.requestForm.reason

    const updateRequestForm = {
        isAccept,
        reason
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
            .populate('userId', 'firstName lastName email profile') // Populate the 'userId' field with 'firstName', 'lastName', and 'role' from the associated 'User' model
            .exec();
        console.log(parents)
        const parentData = parents.map((parent) => {
            console.log("parent object:", parent);
            const imageFilename = parent.userId.profile;
            console.log("imageFilename: ", imageFilename);
            const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);
            console.log("imageFilePath: ", imageFilePath);
            const imageUrl = `http://localhost:8070/images/${imageFilename}`;
            return {
                userId: parent.userId._id,
                firstName: parent.userId.firstName, // Access the first name from the populated 'userId' field
                lastName: parent.userId.lastName,
                email: parent.userId.email,
                profile: imageUrl
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

const getParent = async (req, res) => {
    let babysitterId = req.params.id;
    console.log("babysitterID:", babysitterId);
    await Babysitter.find({userId: babysitterId})
    try {
        const babysitter = await Babysitter.findOne({userId: babysitterId})

        console.log("dcscw: " ,babysitter);

        if (!babysitter.userId._id) {
            return res.status(404).send({status: "Babysitter not found"});
        }

        const babysitterData = {
            _id: babysitter.userId._id,
            age: babysitter.age,
            gender: babysitter.gender,
            parent: babysitter.parent,
            profile: babysitter.userId.profile,
            firstName: babysitter.userId.firstName,
            lastName: babysitter.userId.lastName,
            email: babysitter.userId.email,
            phone: babysitter.userId.phone,
            address: babysitter.userId.address,
            nic: babysitter.userId.nic,
            religon: babysitter.religion,
            language: babysitter.language,
            startDate: babysitter.startDate,
            endDate: babysitter.endDate,
            // qualifications: imageUrls // Assign the imageUrls array to qualifications
        };
        console.log(babysitterData)

        res.status(200).send({status: "babysitter", babysitter: babysitterData});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with get babysitter", error: err.message});
    }
};

const getParentDetails = async (req, res) => {
    let parentId = req.params.id;
    console.log("fbgds")
    console.log("parentID:", parentId);
    const parent = await Parent.findOne({userId: parentId})
    .populate('userId', 'firstName lastName email phone address nic age religon language profile') // Populate the 'userId' field with 'firstName', 'lastName', and other fields from the associated 'User' model
    .exec();

    if (!parent.userId._id) {
        return res.status(404).send({status: "Parent not found"});
    }

    const imageFilename = parent.userId.profile;
    console.log("parent: ", parent);
    const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);
    console.log("imageFilePath: ", imageFilePath);
    const imageUrl = `http://localhost:8070/images/${imageFilename}`;

    try {
        const parentData = {
            profile: imageUrl,
            firstName: parent.userId.firstName,
            lastName: parent.userId.lastName,
            email: parent.userId.email,
            phone: parent.userId.phone,
            address: parent.userId.address,
            nic: parent.userId.nic,
            phone: parent.userId.phone
            // qualifications: imageUrls // Assign the imageUrls array to qualifications
        };
        console.log(parentData)

        res.status(200).send({status: "babysitter",parent: parentData});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with get babysitter", error: err.message});
    }
};

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


const getTodayTaskList = async (req,res) =>{
    try{
        let userId = req.params.id;
        const todayDate = new Date().toJSON().slice(0,10);
        console.log("BabysitterID: ", userId);
        console.log(todayDate);
        const todayTaskList = await TaskListForm.find(
            {
                Babysitter: userId,
                date : todayDate
            });
        console.log(todayTaskList.tasks);

        if( !todayTaskList || todayTaskList.length === 0)
        {
            res.status(404).send({status : "No task list found in today for this bs"});

        }else {
            res.status(200).send({ status: "Today task list found for this bs", todayTaskList });
        }
    }catch(err)
    {
        console.log(err.message);
        res.status(500).send({status: "Error with get today task list", error: err.message});
    }
};



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
    getRequestForm,
    getParent,
    getParentDetails,
    getTodayTaskList,
};