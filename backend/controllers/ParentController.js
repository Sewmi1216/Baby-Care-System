let Parent = require("../models/Parent");
let Task = require("../models/task");
let RequestForm = require("../models/requestForm");

let Complaint = require("../models/Complaint");

let Feedback = require("../models/feedback");


const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Assuming you have a Parent model
    Parent.findOne({ email: email, password: password })
        .then(parent => {
            if (parent) {
                // Successful login
                res.json("Login successful");
            } else {
                // Invalid credentials
                res.status(401).json("Invalid credentials");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json("An error occurred");
        });
};

const addParent = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;
    const nic = req.body.nic;

    const newParent = new Parent({
        firstName,
        lastName,
        email,
        phone,
        address,
        password,
        nic
    })
    //then->js promise||like if else condition
    newParent.save().then(() => {
        res.json("Parent Added");
    }).catch((err) => {
        console.log(err);
    })
}

const addTask = async (req, res) =>{
    // const status = req.body.status;
    // const time = req.body.time;
    const taskName = req.body.taskName;
    // const isCompleted = Boolean(req.body.isCompleted);
    // const remainderStatus = Boolean(req.body.remainderStatus);

    const newTask = new Task({
        // status,
        // time,
        taskName,
        // isCompleted,
        // remainderStatus,
    });

    await newTask.save()
    .then((task) => {
        res.status(200).send({status: "Task is added", task});
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with the task", error: err.message});
    });
};

const updateTask = async (req, res) => {
    let taskId = req.params.id; //fetch the id
  
    const {status, time, name, taskCompletedStatus, remainderStatus} = req.body; // new value

    const updateTask = {
        status,
        time,
        name,
        taskCompletedStatus,
        remainderStatus
    };

    await Task.findByIdAndUpdate(taskId, updateTask)
        .then((task) => {
            res.status(200).send({ status: "Task updated", task });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
};

const deleteTask = async (req, res) => {
    let taskId = req.params.id;

    await Task.findByIdAndDelete(taskId)
        .then((task) => {
            res.status(200).send({ status: "Task Deleted", task });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete task", error: err.message });
        });
};

const addRequestForm = async (req, res) => {
    const workExpectation = req.body.workExpectation;
    const numberofBabies = req.body.numberofBabies;
    const babyDetails = req.body.babyDetails;
    const specialNeeds = req.body.specialNeeds;

    const newRequestFormData = new RequestForm ({
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
            res.status(200).send({ status: "Request form updated", requestForm });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
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

const addComplaint = async (req, res) =>{

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
  
    const {type,description,status,date} = req.body; // new value

    const updateComplaint = {
        type,
        description,
        status,
        date
    };

    await Complaint.findByIdAndUpdate(complaintid, updateComplaint)
        .then((complaint) => {
            res.status(200).send({ status: "Complaint is updated", complaint });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
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
}

module.exports={
    login,
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
    addFeedback,
};