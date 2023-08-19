let Parent = require("../models/Parent");
let User = require("../models/User");

// let Task = require("../models/task");
let TaskList = require("../models/tasklist");

let Baby = require("../models/baby");

let RequestForm = require("../models/requestForm");
const bcrypt = require("bcryptjs");
let Complaint = require("../models/Complaint");

let Feedback = require("../models/feedback");
const Babysitter = require("../models/babysitter");


const addParent = async (req, res) => {
    try {
        const {role, firstName, lastName, email, phone, address, password, nic} = req.body;

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
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        newUser.password = hashedPassword;

        const createdUser = await newUser.save();

        const newParent = new Parent({
            userId: createdUser._id,
        });

        await newParent.save();

        res.status(201).json({message: "Parent added successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "An error occurred"});
    }

};

const addBaby = async (req, res) => {
    const firstName = req.body.baby.firstName;
    const lastName = req.body.baby.lastName;
    const age = req.body.baby.age;
    const gender = req.body.baby.gender;
    const birthDate = req.body.baby.birthDate;
    const parentID = req.body.userID; // Add this line to retrieve parentID from the request body

    console.log(firstName)
    if (!parentID) {
        return res.status(400).send({status: "Bad Request", error: "Incomplete or invalid data"});
    }
   const newBaby = new Baby({
        firstName,
        lastName,
        age,
        gender,
        birthDate,
        parent: parentID
    });

    try {
        const savedBaby = await newBaby.save();
        res.status(201).send({status: "Baby is added", baby: savedBaby});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error adding baby", error: err.message});
    }
};


    
    const addTask = async (req, res) => {
        const { tasklistName, task } = req.body;
        const parentId = req.session.user.id;
        {console.log(parentId)}
    
        const newTaskList = new TaskList({
            tasklistName,
            parent: parentId,
            task,
        });
        

        await newTaskList.save()
            .then(async (taskList) => {
                // Add the task list to the parent's taskLists array
                await Parent.findByIdAndUpdate(parentId, {
                    $push: { taskLists: taskList._id },
                });
    
                res.status(200).send({ status: "Task list is added", taskList });
            })
            .catch((err) => {
                console.log(err.message);
                res.status(500).send({ status: "Error with the task list", error: err.message });
            });
    };

   
const getBabies = async (req, res) => {
    await Baby.find()
        .then((babies) => {
            res.status(200).send({status: "All babies", babies});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with get all babies", error: err.message});
        });
};




const updateTask = async (req, res) => {
    let taskId = req.params.id; //fetch the id

    const {taskName, time, isRemainder, specialNote} = req.body; // new value

    const updateTask = {
        taskName,
        time,
        isRemainder,
        specialNote,
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

const deleteTask = async (req, res) => {
    let taskId = req.params.id;

    await Task.findByIdAndDelete(taskId)
        .then((task) => {
            res.status(200).send({status: "Task Deleted", task});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with delete task", error: err.message});
        });
};

const addRequestForm = async (req, res) => {
    const workExpectation = req.body.workExpectation;
    const numberofBabies = req.body.numberofBabies;
    const babyDetails = req.body.babyDetails;
    const specialNeeds = req.body.specialNeeds;

    const newRequestFormData = new RequestForm({
        workExpectation,
        numberofBabies,
        babyDetails,
        specialNeeds,
    })

    await newRequestFormData.save()
        .then((requestForm) => {
            res.status(200).send({status: "Request form added", requestForm});
        })
        .catch((err) => {
            res.status(500).send({status: "Error with add request form", error: err.message})
        })
}

const updateRequestForm = async (req, res) => {
    let requestFormId = req.params.id; //fetch the id

    const {workExpectation, numberofBabies, babyDetails, specialNeeds} = req.body; // new value

    const updateRequestForm = {
        workExpectation,
        numberofBabies,
        babyDetails,
        specialNeeds
    };

    await RequestForm.findByIdAndUpdate(requestFormId, updateRequestForm)
        .then((requestForm) => {
            res.status(200).send({status: "Request form updated", requestForm});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        });
};

const deleteRequestForm = async (req, res) => {
    let requestFormId = req.params.id;

    await RequestForm.findByIdAndDelete(requestFormId)
        .then((requestForm) => {
            res.status(200).send({status: "Request form deleted", requestForm});
        })
        .catch((err) => {
            res.status(500).save({status: "Error with delete form", error: err.message})
        })
}
//complaint handling

const addComplaint = async (req, res) => {

    const type = req.body.type;
    const description = req.body.description;
    const status = req.body.status;


    const newComplaint = new Complaint({
        type,
        description,
        status,
        date,

    });

    await newComplaint.save()
        .then(() => {
            res.status(200).send({status: "Complaint is added"});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with the complaint", error: err.message});
        });
};


const updateComplaint = async (req, res) => {
    let complaintid = req.params.id; //fetch the id

    const {type, description, status, date} = req.body; // new value

    const updateComplaint = {
        type,
        description,
        status,
        date
    };

    await Complaint.findByIdAndUpdate(complaintid, updateComplaint)
        .then((complaint) => {
            res.status(200).send({status: "Complaint is updated", complaint});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        });
};

const deleteComplaint = async (req, res) => {
    let complaintid = req.params.id;

    await Complaint.findByIdAndDelete(complaintid)
        .then((complaint) => {
            res.status(200).send({status: "Complaint is Deleted", complaint});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with delete complaint", error: err.message});
        });
}

const addFeedback = async (req, res) => {
    //parent name
    const details = req.body.details;
    const rating = req.body.rating;

    const newFeedback = new Feedback({
        //parentName: req.Parent.name,
        details,
        rating: Number(rating),
    })

    await newFeedback.save()
        .then((feedback) => {
            res.status(200).send({status: "Feedback is added", feedback});
        })
        .catch((err) => {
            res.status(500).send({status: "Error with add feedback", error: err.message})
        })

};
module.exports = {
    addParent,
    addTask,
    updateTask,
    deleteTask,
    addRequestForm,
    updateRequestForm,
    deleteRequestForm,
    addComplaint,
    updateComplaint,
    deleteComplaint,
    addBaby,
    addFeedback,
    getBabies
};