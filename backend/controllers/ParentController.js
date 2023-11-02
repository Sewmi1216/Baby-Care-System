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


let GrowthParameters = require("../models/GrowthParameters");
let AgeGroups = require("../models/ageGroup");
let Vaccines = require("../models/vaccine");
const path = require("path");

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
        const role = req.body.role;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const password = req.body.cpassword;
        const nic = req.body.nic;
        const profile = req.file.filename;

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
            nic,
            profile
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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const birthDate = req.body.birthDate;
    const parentID = req.body.userId; // retrieve parentID from the request body
    const img = req.file.filename;

    console.log(parentID)
    if (!parentID) {
        return res.status(400).send({status: "Bad Request", error: "Incomplete or invalid data"});
    }
    const newBaby = new Baby({
        firstName,
        lastName,
        gender,
        birthDate,
        img,
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
    const babysitter = req.body.taskListForm.Babysitter;
    console.log(parentID);

    if (!parentID) {
        return res.status(400).send({status: "Bad Request", error: "Invalid"});
    }
    const newTaskListFormData = new TaskListForm({

        parent: parentID,

        taskListName,
        tasks,
        date,
        babysitter
    })
    try {
        const savedTaskListForm = await newTaskListFormData.save();
        console.log(savedTaskListForm);
        return res.status(201).send({
            status: "RequestForm is added",
            taskListForm: savedgetAllOldTaskListsgetAllOldTaskListsTaskListForm
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({status: "Error adding requestForm", error: err.message});
    }
};


const addDateForTaskList = async (req, res) => {

}


const getAllTaskListTemplates = async (req, res) => {
    try {
        let userId = req.params.id;
        // console.log(userId);

        const taskListForms = await TaskListForm.find({parent: userId, date: null});
        // console.log(taskListAllTemplates);

        if (!taskListForms || taskListForms.length === 0) {
            res.status(404).send({status: "No task list added previously."});
        } else {
            res.status(200).send({status: "All templates", taskListForms});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get all templates", error: err.message});
    }
}

const getTaskListTemplate = async (req, res) => {
    try {
        const taskListId = req.params.id; // Use req.params.id to get the _id from the request

        const taskListForms = await TaskListForm.findById(taskListId);
        console.log(taskListForms);

        if (!taskListForms) {
            res.status(404).send({status: "No task list found with the provided ID."});
        } else {
            console.log(taskListForms);
            res.status(200).send({status: "Task list template found", taskListForms});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with getting the task list template", error: err.message});
    }
};

const deleteTaskListTemp = async (req, res) => {
    let taskListId = req.params.id;
    try {
        const deletedTaskList = await TaskListForm.findByIdAndDelete(taskListId);
        if (!deletedTaskList) {
            return res.status(404).json({error: "Task List not found"});
        }
        res.status(200).send({status: "Task List Template deleted"});
    } catch (error) {
        console.error("Error with delete Template:", error);
        res.status(500).json({error: "Internal Server Error"});
    }

}


const getBabies = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("parentID:", userId);

        const babies = await Baby.find({parent: userId});

        if (!babies || babies.length === 0) {
            res.status(404).send({status: "No babies found for this parent"});
        } else {
            const imageUrls = babies.map(baby => {
                console.log("baby object:", baby);
                const imageFilename = baby.img;
                console.log("imageFilename: ", imageFilename);
                const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);
                console.log("imageFilePath: ", imageFilePath);
                const imageUrl = `http://localhost:8070/images/${imageFilename}`;
                return {baby, imageUrl};
            });

            res.status(200).send({status: "All babies", babies: imageUrls});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get all babies", error: err.message});
    }
};


const getBaby = async (req, res) => {
    try {
        let babyId = req.params.id;

        console.log("BabyId:", babyId);

        const baby = await Baby.findOne({_id: babyId});
        // const activities = parameters.map(parameters => parameters.activity);

        if (!baby) {
            res.status(404).send({status: "No baby"});
        } else {
            const imageFilename = baby.img;
            console.log("baby: ", baby);
            const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);

            console.log("imageFilePath: ", imageFilePath);
            const imageUrl = `http://localhost:8070/images/${imageFilename}`;


            // Send user information along with the image file
            res.status(200).json({status: "user", baby, imageUrl});
        }
        // if (!Baby || Baby.length === 0) {
        //     res.status(404).send({ status: "No activities found for this ageGroup" });
        // } else {
        //     res.status(200).send({ status: "Baby details", Baby});
        // }

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
};


const getAllOldTaskLists = async (req, res) => {
    try {
        let userId = req.params.id;
        const todayDate = new Date().toJSON().slice(0, 10);

        const OldAllTaskLists = await TaskListForm.find(
            {
                parent: userId,
                date: {$lt: todayDate}
            }
        );
        console.log(OldAllTaskLists);
        if (!OldAllTaskLists || OldAllTaskLists.length === 0) {
            res.status(404).send({status: "No old task lists found for this parent"});
        } else {
            res.status(200).send({status: "Old task lists found for this parent", OldAllTaskLists});
            console.log(OldAllTaskLists)
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({status: "Error with get old task lists.", error: err.message});
    }
}


// const getAllNextTaskLists = async(req,res) => {
//     try {
//         let userId = req.params.id;
//         const todayDate = new Date().toJSON().slice(0,10);
//
//         const NextAllTaskLists = await TaskListForm.find(
//             {
//                 parent:userId,
//                 date :{$gt : todayDate},
//             }
//         );
//         console.log(NextAllTaskLists);
//         if( !NextAllTaskLists || NextAllTaskLists.length === 0)
//         {
//             res.status(404).send({status : "No next task lists found for this parent"});
//         }else{
//             res.status(200).send({status: "Next task lists found for this parent", NextAllTaskLists});
//             console.log(NextAllTaskLists)
//         }
//     }
//     catch(err)
//     {
//         console.log(err.message);
//         res.status(500).send({status: "Error with get next task lists.", error: err.message});
//     }
// }


const getNextAllTaskLists = async (req, res) => {
    try {
        let userId = req.params.id;
        const todayDate = new Date().toJSON().slice(0, 10);
        const nextTaskLists = await TaskListForm.find(
            {
                parent: userId,
                date: {$gt: todayDate}
            }
        );
        if (!nextTaskLists || nextTaskLists.length === 0) {
            res.status(404).send({status: "No Next task lists found for this parent"});
        } else {
            res.status(200).send({status: "Next task lists found for this parent", nextTaskLists});
            console.log(nextTaskLists)
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({status: "Error with get next task lists.", error: err.message});
    }
};


const getTodayTaskList = async (req, res) => {
    try {
        let userId = req.params.id;
        const todayDate = new Date().toJSON().slice(0, 10);
        console.log("parentID: ", userId);
        console.log(todayDate);
        const todayTaskList = await TaskListForm.find(
            {
                parent: userId,
                date: todayDate
            });
        console.log(todayTaskList.tasks);

        if (!todayTaskList || todayTaskList.length === 0) {
            res.status(404).send({status: "No task list found in today for this parent"});

        } else {
            res.status(200).send({status: "Today task list found for this parent", todayTaskList});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get today task list", error: err.message});
    }
};


const updateTaskListTemplate = async (req, res) => {
    let taskId = req.params.id;
    const {taskName, time, isRemainder, specialNote} = req.body;
    const updateTask = {
        taskName,
        time,
        isRemainder,
        specialNote
    };

    await TaskListForm.findByIdAndUpdate(taskId, updateTask).then(
        (tasklistforms) => {
            res.status(200).send({status: "Task List updated."});
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

    // const babysitter = await RequestForm.find({babysitter: Babysitter});
    // console.log(babysitter);

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

    // if(!babysitter){
    try {
        const savedRequestForm = await newRequestFormData.save();
        return res.status(201).send({status: "RequestForm is added", requestForm: savedRequestForm});
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({status: "Error adding requestForm", error: err.message});
    }
    // }
    // else{
    //     return res.status(500).send({status: "Already added", error: "Already added"});
    // }

}

const deleteRequestForm = async (req, res) => {
    let requestFormId = req.params.id;
    console.log(requestFormId);
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


// const addComplaint = async (req, res) => {
//
//     const type = req.body.type;
//     const description = req.body.description;
//     const status = req.body.status;
//
//
//     const newComplaint = new Complaint({
//         type,
//         description,
//         status,
//         date,
//
//     });
//
//     await newComplaint.save()
//         .then(() => {
//             res.status(200).send({status: "Complaint is added"});
//         })
//         .catch((err) => {
//             console.log(err.message);
//             res.status(500).send({status: "Error with the complaint", error: err.message});
//         });
// };
//
//
// const updateComplaint = async (req, res) => {
//     let complaintid = req.params.id; //fetch the id
//
//     const {type, description, status, date} = req.body; // new value
//
//     const updateComplaint = {
//         type,
//         description,
//         status,
//         date
//     };
//
//     await Complaint.findByIdAndUpdate(complaintid, updateComplaint)
//         .then((complaint) => {
//             res.status(200).send({status: "Complaint is updated", complaint});
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send({status: "Error with updating data", error: err.message});
//         });
// };
//
// const deleteComplaint = async (req, res) => {
//     let complaintid = req.params.id;
//
//     await Complaint.findByIdAndDelete(complaintid)
//         .then((complaint) => {
//             res.status(200).send({status: "Complaint is Deleted", complaint});
//         })
//         .catch((err) => {
//             console.log(err.message);
//             res.status(500).send({status: "Error with delete complaint", error: err.message});
//         });
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
    try {
        const babysitters = await Babysitter.find()
            .populate('userId', 'firstName lastName email phone address nic profile') // Populate the 'userId' field with 'firstName', 'lastName', and 'role' from the associated 'User' model
            .exec();

        const babysitterData = babysitters.map((babysitter) => {
            console.log("babysitter object:", babysitter);
            const imageFilename = babysitter.userId.profile;
            console.log("imageFilename: ", imageFilename);
            const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);
            console.log("imageFilePath: ", imageFilePath);
            const imageUrl = `http://localhost:8070/images/${imageFilename}`;
            return {
                userId: babysitter.userId._id,
                age: babysitter.age,
                gender: babysitter.gender,
                image: babysitter.image,
                firstName: babysitter.userId.firstName, // Access the first name from the populated 'userId' field
                lastName: babysitter.userId.lastName,
                email: babysitter.userId.email,
                phone: babysitter.userId.phone,
                address: babysitter.userId.address,
                nic: babysitter.userId.nic,
                religon: babysitter.userId.religon,
                language: babysitter.userId.language,
                isHired: babysitter.isHired,
                profile: imageUrl
            };
        });
        res.status(200).send({
            status: "All babysitters", babysitters: babysitterData
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with get all babysitters", error: err.message});
    }
};


const getBabysitter = async (req, res) => {
    let babysitterId = req.params.id;
    console.log("babysitterID:", babysitterId);
    await Babysitter.find({userId: babysitterId})
    
    try {
        const babysitter = await Babysitter.findOne({userId: babysitterId})
            .populate('userId', 'firstName lastName email phone address nic age religon language profile') // Populate the 'userId' field with 'firstName', 'lastName', and other fields from the associated 'User' model
            .exec();

        // console.log(babysitter);

        if (!babysitter.userId._id) {
            return res.status(404).send({status: "Babysitter not found"});
        }

        if (babysitter.qualifications) {
            imageUrls = babysitter.qualifications.map(qualification => {
                console.log("Tharushi");
                console.log("baby object:", qualification);
                const imageFilename = qualification.filename;
                console.log("imageFilename: ", imageFilename);
                const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);
                console.log("imageFilePath: ", imageFilePath);
                const imageUrl = `http://localhost:8070/images/${imageFilename}`;
                return {imageUrl}; // Return an object with qualification and imageUrl
            });
        }
        const babysitterData = {
            _id: babysitter.userId._id,
            age: babysitter.age,
            gender: babysitter.gender,
            // image: babysitter.image,
            firstName: babysitter.userId.firstName,
            lastName: babysitter.userId.lastName,
            email: babysitter.userId.email,
            phone: babysitter.userId.phone,
            address: babysitter.userId.address,
            nic: babysitter.userId.nic,
            religion: babysitter.religion,
            language: babysitter.language,
            startDate: babysitter.startDate,
            endDate: babysitter.endDate,
            qualifications: imageUrls ,// Assign the imageUrls array to qualifications
            profile: babysitter.userId.profile
        };
        console.log(babysitterData)

        res.status(200).send({status: "babysitter", babysitter: babysitterData});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with get babysitter", error: err.message});
    }
};


const getRequestForms = async (req, res) => {

    try {
        let userId = req.params.id;
        console.log("parentID:", userId);
        const requestForms = await RequestForm.find({parent: userId});

        if (!requestForms || requestForms.length === 0) {
            res.status(404).send({status: "No requestForms found for this parent"});
        } else {
            res.status(200).send({status: "All requestForms", requestForms});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get all requestForms", error: err.message});
    }
}


const createTaskListTemplate = async (req, res) => {// 3
    const newTaskListData = req.body;
    try {
        const createdTaskList = await TaskListForm.create(newTaskListData);
        res.status(201).json({status: "Task List Template created", createdTaskList});
    } catch (error) {
        console.error('Error with creating new Template:', error);
        res.status(500).json({status: "Error with create Template", error: error.message});
    }
}
// fetching parameters, according to user choose age Group
const getParameters = async (req, res) => {
    try {
        let ageGroupId = req.params.ageGroup;

        console.log("ageGroup:", ageGroupId);

        const parameters = await GrowthParameters.find({ageGroup: ageGroupId});
        // const activities = parameters.map(parameters => parameters.activity);

        if (!parameters || parameters.length === 0) {
            res.status(404).send({status: "No activities found for this ageGroup"});
        } else {
            res.status(200).send({status: "All ageGroups", parameters});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
};

const getAgeGroup = async (req, res) => {
    try {
        const ageGroups = await AgeGroups.find();
        if (!ageGroups || ageGroups.length === 0) {
            res.status(404).send({status: "No ageGroups found for this baby"});
        } else {
            res.status(200).send({status: "All ageGroups", ageGroups});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({err: 'Error with review age groups'})
    }
};

const getVaccineList = async (req, res) => {
    try {
        const vaccines = await Vaccines.find();
        if (!vaccines || vaccines.length === 0) {
            res.status(404).send({status: "No vaccines for this age"});
        } else {
            res.status(200).send({status: "All vaccines", vaccines});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({err: 'Error with review vaccines'})
    }
};

const updateParent = async (req, res) => {
    const babysitterID = req.params.id1;
    const userId = req.params.id2;

    const updateParent = {
        babysitter: babysitterID,
    };

    const updateBabysitter = {
        parent: userId,
        isHired: true,
        startDate: Date.now()
    }

    try {

        const updatedParent = await Parent.findOneAndUpdate({userId}, updateParent, {new: true});

        const updatedBabysitter = await Babysitter.findOneAndUpdate({userId: babysitterID}, updateBabysitter, {new: true})

        console.log(updatedParent);
        console.log(updatedBabysitter)

        if (!updatedParent) {
            return res.status(404).send({status: "Parent not found"});
        }
        res.status(200).send({status: "Parent updated", updatedParent});
    } catch (err) {
        console.error(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }
};

const getOnlyParent = async (req, res) => {
    try {
        let parentId = req.params.id;
        console.log("parentID:", parentId);

        const parent = await Parent.findOne({userId: parentId});
        console.log(parent)

        if (!parent) {
            res.status(404).send({status: "No parent found"});
        } else {
            res.status(200).send({status: "parent : ", parent});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get all babies", error: err.message});
    }
}
const getParentProfile = async (req, res) => {
    try {
        let parentId = req.params.id;
        console.log("parentID:", parentId);

        const parent = await User.findOne({_id: parentId});
        console.log(parent)

        if (!parent) {
            res.status(404).send({status: "No parent found"});
        } else {

            const imageFilename = parent.profile;
            console.log("parent: ", parent);
            const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);

            console.log("imageFilePath: ", imageFilePath);
            const imageUrl = `http://localhost:8070/images/${imageFilename}`;

            res.status(200).json({status: "user", parent, imageUrl});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with getting parent", error: err.message});
    }
}
const updateParentProfile = async (req, res) => {
    try {
        let parentId = req.params.id
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;

        console.log("body", req.body)
        const updateParent = {
            firstName,
            lastName,
            phone,
            address,
            email
        }

        const update = await User.findByIdAndUpdate(parentId, updateParent, {new: true});

        if (!update) {
            return res.status(404).send({status: "Parent not found", update});
        }

        res.status(200).send({status: "Parent updated", update: update});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }
}

const updateToPlan = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming userId is used to identify the user

        console.log(userId);

        const updatePlan = {
            plan: "free"
        }

        const updatedUser = await Parent.findOneAndUpdate({userId: userId}, updatePlan, {new: true});

        console.log(updatedUser);

        if (!updatedUser) {
            return res.status(404).send({status: "User not found", update: updatedUser});
        }

        res.status(200).send({status: "Plan updated", update: updatedUser});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }
}
const updateToPremium = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming userId is used to identify the user

        console.log(userId);

        const updatePlan = {
            plan: "premium"
        }

        const updatedUser = await Parent.findOneAndUpdate({userId: userId}, updatePlan, {new: true});

        console.log(updatedUser);

        if (!updatedUser) {
            return res.status(404).send({status: "User not found", update: updatedUser});
        }

        res.status(200).send({status: "Plan updated", update: updatedUser});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }
}


const getBabiesCount = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("parentID:", userId);

        const babies = await Baby.find({parent: userId});

        if (!babies || babies.length === 0) {
            res.status(404).send({status: "No babies found for this parent"});
        } else {
            res.status(200).send({status: "Success", count: babies.length});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get number of babies", error: err.message});
    }
};

const getRequestsCount = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("parentID:", userId);

        const requestForms = await RequestForm.find({parent: userId});

        if (!requestForms || requestForms.length === 0) {
            res.status(404).send({status: "No requests forms found for this parent"});
        } else {
            res.status(200).send({status: "Success", count: requestForms.length});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get number of request forms", error: err.message});
    }
}

const updateBabysitter = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("babysitterId:", userId);

        const {endDate, extendDate} = req.body; // new value

        const updateBabysitter = {
            endDate,
        };

        console.log(updateBabysitter);

        const updatedBabysitter = await Babysitter.findOneAndUpdate({userId: userId}, updateBabysitter, {new: true});
        console.log(updatedBabysitter)

        if (!updatedBabysitter) {
            return res.status(404).send({status: "Babysitter not found", updatedBabysitter});
        } else {
            console.log("Tharushi")
        }

        res.status(200).send({status: "Babysitter updated", updateBabysitter: updatedBabysitter});
    } catch (err) {
        console.error(err.message);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }
}

const getPlan = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("parentID:", userId);

        const plan = await Parent.findOne({userId: userId});


        if (plan) {
            res.status(200).json({plan});
        } else {
            res.status(404).json({status: "Plan not found"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({status: "Error with get plan", error: err.message});
    }
};

// const addComplaint = async (req, res) => {
//     const id = req.body.id;
//     const type = req.body.type;
//     const description = req.body.description;
//
//
//     console.log("ishini", userId)
//     if (!userId) {
//         return res.status(400).send({status: "Bad Request", error: "Incomplete or invalid data"});
//     }
//     const newComplaint = new Complaint({
//         id,
//         type,
//         description,
//
//         user: userId
//     });
//
//
//     try {
//         const savedComplaint = await newComplaint.save();
//         res.status(201).send({status: "Complaint is added", complaint: savedComplaint});
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send({status: "Error adding Complaint", error: err.message});
//     }
// };

const deleteBabysitter = async (req, res) => {
    let babysitterID = req.params.id1;
    let userId = req.params.id2;
    console.log(babysitterID)
    console.log(userId);

    const updateParent = {
        babysitter: null,
    };

    const updateBabysitter = {
        parent: null,
        isHired: false,
        startDate: null,
        endDate: null,
        extendDate: null
    };

    try {
        const updatedParent = await Parent.findOneAndUpdate({userId}, updateParent, {new: true});

        const updatedBabysitter = await Babysitter.findOneAndUpdate({userId: babysitterID}, updateBabysitter, {new: true})

        const requestForm = await RequestForm.findOneAndDelete({Babysitter: babysitterID}, {parent: userId});

        if (!updatedParent) {
            return res.status(404).send({status: "Parent not found"});
        }
        res.status(200).send({status: "Parent updated", updatedBabysitter});
    } catch (err) {
        console.error(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }
};


module.exports = {
    createTaskListTemplate,//4
    addParent,
    addTaskList,
    addDateForTaskList,
    getAllTaskListTemplates,
    getTaskListTemplate,
    deleteTaskListTemp,
    deleteTask,
    addRequestForm,
    deleteRequestForm,
    addComplaint,
    // updateComplaint,
    // deleteComplaint,
    addBaby,
    addFeedback,
    getBabies,
    viewParentProfile,
    getBabysitters,
    getBabysitter,
    getRequestForms,
    getAgeGroup,
    getParameters,
    getVaccineList,
    getBaby,
    updateParent,
    getOnlyParent,
    getBabiesCount,
    getRequestsCount,
    updateBabysitter,
    getTodayTaskList,
    getAllOldTaskLists,
    getNextAllTaskLists,
    updateTaskListTemplate,
    updateParentProfile,
    getParentProfile,
    getPlan,
    updateToPlan,
    updateToPremium,
    deleteBabysitter
};