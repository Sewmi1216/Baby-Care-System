//parent controller
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
const TaskListForm = require("../models/tasklist");

const viewParentProfile = async (req, res) => {
    let token = req.cookies.access_token;
    console.log('access-token:', token);
    let userId = req.params.id;
    const user = await User.findById(userId)
        .then((parent) => {
            res.status(200).send({status: "Parent fetched", parent});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with getting parent", error: err.message});
        })
}
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



/* Create task list*/
const addTaskList = async (req, res) => {
    console.log(req.body);
    const taskListName = req.body.taskListForm.taskListName;
    const date = req.body.taskListForm.date;
    const tasks = req.body.taskListForm.tasks;
    const parentID = req.body.userID;
    //const Babysitter = req.body.taskListForm.Babysitter;
    console.log(parentID);

    if(!parentID){
        return res.status(400).send({status:"Bad Request", error:"Invalid"});
    }
    const newTaskListFormData = new TaskListForm ({

        parent:parentID,

        taskListName,
        tasks,
        date,
        //Babysitter
    })
    try{
        const savedTaskListForm = await newTaskListFormData.save();
        console.log(savedTaskListForm);
        return res.status(201).send({status: "RequestForm is added", taskListForm: savedTaskListForm});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({status: "Error adding requestForm", error: err.message});
    }
};


const getAllTaskListTemplates = async(req,res)=>{
    try{
        let userId = req.params.id;
        // console.log(userId);

        const taskListForms = await TaskListForm.find({parent: userId});
        // console.log(taskListAllTemplates);

        if(!taskListForms || taskListForms.length === 0)
        {
            res.status(404).send({status: "No task list added previously."});
        }
        else{
            res.status(200).send({status: "All templates", taskListForms});
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({ status: "Error with get all templates", error: err.message });
    }
}





const getBabies = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("parentID:", userId);

        const babies = await Baby.find({ parent: userId });

        if (!babies || babies.length === 0) {
            res.status(404).send({ status: "No babies found for this parent" });
        } else {
            res.status(200).send({ status: "All babies", babies });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get all babies", error: err.message });
    }
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
    const workExpectation = req.body.requestForm.workExpectation;
    const babyDetails = req.body.requestForm.babyDetails;
    const specialNeeds = req.body.requestForm.specialNeeds;
    const parentID = req.body.userID;
    const Babysitter = req.body.requestForm.Babysitter;
    // console.log(parentID)
    // console.log(specialNeeds)
    if (!parentID) {
        return res.status(400).send({status: "Bad Request", error: "Incomplete or invalid data"});
    }

    const newRequestFormData = new RequestForm({
        parent: parentID,
        workExpectation,
        babyDetails,
        specialNeeds,
        Babysitter
    })

    try{
        const savedRequestForm = await newRequestFormData.save();
        return res.status(201).send({status: "RequestForm is added", requestForm: savedRequestForm});       
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({status: "Error adding requestForm", error: err.message});
    }
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

const getBabysitters = async (req, res) => {
    await Babysitter.find()
    try{
        const babysitters = await Babysitter.find()
        .populate('userId', 'firstName lastName email phone address nic') // Populate the 'userId' field with 'firstName', 'lastName', and 'role' from the associated 'User' model
        .exec();

        const babysitterData = babysitters.map((babysitter) => {
            return {
              _id: babysitter._id,
              age: babysitter.age,
              gender: babysitter.gender,
              image: babysitter.image,
              firstName: babysitter.userId.firstName, // Access the first name from the populated 'userId' field
              lastName: babysitter.userId.lastName, 
              email: babysitter.userId.email,
              phone: babysitter.userId.phone,
              address: babysitter.userId.address,
              nic: babysitter.userId.nic
            };
          });
          res.status(200).send({ status: "All babysitters", babysitters: babysitterData 
        });
  
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with get all babysitters", error: err.message });
    }
};

// const deleteTaskListTemplate = async(req,res)=>{
//     let taskListTemplatId = req.params.id;
//
//     await TaskListForm.findByIdAndDelete(taskListTemplatId)
//         .then((taskListForms) => {
//             res.status(200).send({status:'Task List Template deleted', taskListForms});
//         })
//         .catch((err) => {
//             res.status(500).save({status: "Error with delete from", error:err.message})
//         })
// }


// const deleteRequestForm = async (req, res) => {
//     let requestFormId = req.params.id;
//
//     await RequestForm.findByIdAndDelete(requestFormId)
//         .then((requestForm) => {
//             res.status(200).send({status: "Request form deleted", requestForm});
//         })
//         .catch((err) => {
//             res.status(500).save({status: "Error with delete form", error: err.message})
//         })
// }



// const getTaskListTemplateForAddDate = async(req,res)=> {
//     try {
//         let userId = req.params.userId; // Assuming userId is in the route parameters.
//         let taskListId = req.params.taskListId; // Assuming taskListId is in the route parameters.
//
//         // Use both userId and taskListId in your query to find the specific task list template.
//         const taskListForm = await TaskListForm.findOne({ parent: userId, _id: taskListId });
//
//         if (!taskListForm) {
//             res.status(404).send({ status: "Task list not found." });
//         } else {
//             res.status(200).send({ status: "Task list template", taskListForm });
//         }
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send({ status: "Error fetching task list template", error: err.message });
//     }
// }




const getBabysitter = async (req, res) => {
    let babysitterId = req.params.id;
    console.log("babysitterID:", babysitterId);
    await Babysitter.findById(babysitterId)
    try {
        const babysitter = await Babysitter.findById(babysitterId)
            .populate('userId', 'firstName lastName email phone address nic') // Populate the 'userId' field with 'firstName', 'lastName', and other fields from the associated 'User' model
            .exec();

        if (!babysitter) {
            return res.status(404).send({ status: "Babysitter not found" });
        }

        const babysitterData = {
            _id: babysitter._id,
            age: babysitter.age,
            gender: babysitter.gender,
            image: babysitter.image,
            firstName: babysitter.userId.firstName, // Access the first name from the populated 'userId' field
            lastName: babysitter.userId.lastName, 
            email: babysitter.userId.email,
            phone: babysitter.userId.phone,
            address: babysitter.userId.address,
            nic: babysitter.userId.nic
        };

        res.status(200).send({ status: "babysitter", babysitter: babysitterData });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with get babysitter", error: err.message });
    }
};




const getRequestForms = async(req, res) => {
    try {
        let userId = req.params.id;
        console.log("parentID:", userId);
        const requestForms = await RequestForm.find({ parent: userId });

        if (!requestForms || requestForms.length === 0) {
            res.status(404).send({ status: "No requestForms found for this parent" });
        } else {
            res.status(200).send({ status: "All requestForms", requestForms });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get all requestForms", error: err.message });
    }
}
module.exports = {
    addParent,
    //addTask,f
    addTaskList,
    getAllTaskListTemplates,
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
    getBabies,
    viewParentProfile,
    getBabysitters,
    getBabysitter,
    getRequestForms
};