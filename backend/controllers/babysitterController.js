let Babysitter = require("../models/babysitter");
let Task = require("../models/task");
let RequestForm = require("../models/requestForm");

const getAllbabysitters = async (req, res) => {
    await Babysitter.find()
        .then((babysitters) => {
            res.status(200).send({ status: "All babysitters", babysitters });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get all babysitters", error: err.message });
        });
};

const addBabysitter = async (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = Number(req.body.age);
    const address = req.body.address;
    const nic = req.body.nic;
    const gender = req.body.gender;
    const password = req.body.password;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const qualifications = req.body.qualifications;
    const verificationDetails = req.body.verificationDetails;

    const newBabysitter = new Babysitter({
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
        verificationDetails,
    });

    await newBabysitter.save()
        .then((babysitter) => {
            res.status(200).send({ status: "Babysitter added", babysitter});
        })
        .catch((err) => {
            console.log(err.message); 
            res.status(500).send({status: "Error with add babysitter", error: err.message })
        });
};

const getBabysitter = async (req, res) => {
    let userId = req.params.id;

    await Babysitter.findById(userId)
        .then((babysitter) => {
            res.status(200).send({ status: "Babysitter fetched", babysitter });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });
        });
};

const updateBabysitter = async (req, res) => {
    let userId = req.params.id; //fetch the id
  
    const {fname, lname, age, address, nic, gender, password, email, contactNumber, qualifications, verificationDetails} = req.body; // new value

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
            res.status(200).send({ status: "Babysitter updated", babysitter });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
};

const deleteBabysitter = async (req, res) => {
    let userId = req.params.id;

    await Babysitter.findByIdAndDelete(userId)
        .then((babysitter) => {
            res.status(200).send({ status: "User Deleted", babysitter });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });
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
            res.status(200).send({ status: "Task updated", task });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
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
            res.status(200).send({ status: "Request form updated", requestForm });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
}

const getRequestForm = async (req, res) => {
    let requestFormId = req.params.id;

    await RequestForm.findById(requestFormId)
        .then((requestForm) => {
            res.status(200).send({ status: "Request form fetched", requestForm})
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