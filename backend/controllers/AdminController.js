let Admin = require("../models/Admin");
let User = require("../models/User")
let Babysitter = require("../models/babysitter");
let Parent = require("../models/Parent");
let Complaints = require("../models/Complaint");
let SystemInfo = require("../models/SystemInfo");

let Expert = require("../models/DomainExpert");
const bcrypt = require("bcryptjs");
const Complaint = require("../models/Complaint");

const AddAdmin = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone_no = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;
    const nic = req.body.nic;

    const newAdmin = new Admin({
        firstName,
        lastName,
        email,
        phone_no,
        address,
        password,
        nic,
    })
    //then->js promise||like if else condition
    newAdmin.save().then(() => {
        res.json("Admin Added");
    }).catch((err) => {
        console.log(err);
    })
};

const addDomainExpert =async (req, res) => {
        const {firstName, lastName, email, phone, address, password, nic } = req.body;

        // const userExists = await User.findOne({ email: email });
        // if (userExists) {
        //     return res.status(400).json({ message: "User already exists" });
        // }

        const newDomainexpert = new User({
            role: "domain-expert",
            firstName,
            lastName,
            email,
            phone,
            address,
            password,
            nic
        });

        
        // const saltRounds = 12;
        // const hashPassword = await bcrypt.hash(password, saltRounds);
        // newDomainexpert.password = hashPassword;
        // const creatednewDomainexpert = await newDomainexpert.save();

        await newDomainexpert.save().then(() => {
            res.json("Expert Added");
        }).catch((err) => {
            console.log(err);
        })
};

const ViewAllExperts = async (req, res) => {
    await User.find({role : 'domain-expert'})
        .then((expert) => {
            res.status(200).send({ status: "All experts", expert });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with view all experts", error: err.message });
        });
};

const ViewAllComplaint = async (req, res) => {
    await Complaints.find()
        .then((complaint) => {
            res.status(200).send({ status: "All complaints", complaint });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with view all complaints", error: err.message });
        });
};


const ViewAdmin = async (req, res) => {
    let userId = req.params.id;

    await Admin.findById(userId)
        .then((admin) => {
            res.status(200).send({ status: "Admin fetched", admin });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get admin", error: err.message });
        });
};
const UpdateAdmin = async (req, res) => {
    let userId = req.params.id; //fetch the id
  
    const {firstName, lastName, email, phone_no, address, password, nic} = req.body; // new value
    //create a object
    const updateAdmin = {
        firstName,
        lastName,
        email,
        phone_no,
        address,
        password,
        nic
    };

    await Admin.findByIdAndUpdate(userId, updateAdmin)
        .then((admin) => {
            res.status(200).send({ status: "Admin updated", admin });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
};

const DeleteAdmin = async (req, res) => {
    let userId = req.params.id;

    await Admin.findByIdAndDelete(userId)
        .then((admin) => {
            res.status(200).send({ status: "User Deleted", admin });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });
        });
};

const ViewAllBabysitters = async (req, res) => {
    await Babysitter.find()
        .then((babysitters) => {
            res.status(200).send({ status: "All babysitters", babysitters });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with view all babysitters", error: err.message });
        });
};
const ViewBabysitter = async (req, res) => {
    let userId = req.params.id;

    await Babysitter.findById(userId)
        .then((babysitter) => {
            res.status(200).send({ status: "Babysitter fetched", babysitter });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get sitter", error: err.message });
        });
};


const DeleteBabysitter = async (req, res) => {
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

const ViewAllParents = async (req, res) => {
    // console.log("here")
    await Parent.find()
        .then((parents) => {    
            res.status(200).send({ status: "All parents", parents });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with view all parents", error: err.message });
        });
};

const ViewParent = async (req, res) => {
    let userId = req.params.id;

    await Parent.findById(userId)
        .then((parent) => {
            res.status(200).send({ status: "Parent fetched", parent });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get parent", error: err.message });
        });
};
const ViewUser = async (req, res) => {
    let userId = req.params.id;

    await User.findById(userId)
        .then((user) => {
            res.status(200).send({ status: "User fetched", user });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });
        });
};

const DeleteParent= async (req, res) => {
    let userId = req.params.id;

    await Parent.findByIdAndDelete(userId)
        .then((parent) => {
            res.status(200).send({ status: "User Deleted", parent });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });
        });
};



const AddSystemInfo = (req, res) => {
    const about = req.body.about;
    const goals = req.body.goals;
    const service = req.body.service;
    const vision = req.body.vision;
    const team = req.body.team;
    const thank = req.body.thank;

    
    

    const newInfo = new SystemInfo({
        about,
        goals,
        service,
        vision,
        team,
        thank
       
        
    })
    //then->js promise||like if else condition
    newInfo.save().then(() => {
        res.json("Informations Added");
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
};

const UpdateSystemInfo = async (req, res) => {
    let userId = req.params.id; //fetch the id
  
    const {about, goals, service,vision, team, thank} = req.body; // new value
    //create a object
    const updateInfo = {
       about,
       goals,
       service,
       vision,
       team,
       thank
       
    };

    await SystemInfo.findByIdAndUpdate(userId, updateInfo)
        .then((info) => {
            res.status(200).send({ status: "Info are updated", info });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating info", error: err.message });
        });
};

// const UpdateVerifyStatus = async (req, res) => {
//     let userId = req.params.id; //fetch the id
  
//     const {status} = req.body; // new value
//     //create a object
//     const updateInfo = {
//        status,
       
//     };

//     await User.findByIdAndUpdate(userId, updateInfo,{status:"active"})
//         .then((info) => {
            
//             res.status(200).send({ status: "Info are updated", info });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send({ status: "Error with updating info", error: err.message });
//         });
// };
    const UpdateVerifyStatus = async (req, res) => {
        let userId = req.params.id; //fetch the id
  
        const {status }= req.body; // new value
        // const status ="active"
        //create a object
        const verifyInfo = {
            // role,
            // firstName,
            // lastName,
            // email,
            // phone,
            // address,
            // nic,
            status
           
        };
    
        await User.findByIdAndUpdate(userId, verifyInfo)
            .then((info) => {
                res.status(200).send({ status: "Info are updated", info });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ status: "Error with updating info", error: err.message });
            });
    };


const ViewSystemInfo = async (req, res) => {
    await SystemInfo.find()
        .then((information) => {
            res.status(200).send({ status: "All informations", information });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with view all informations", error: err.message });
        });
};

const verifyBabysitter = async (req, res) => {
    const userId = req.params.userId; // Assuming you're getting the userId from the request

    try {
        const verify = { isVerified: true };

        const updatedBabysitter = await Babysitter.findByIdAndUpdate(userId, verify, { new: true });

        if (!updatedBabysitter) {
            return res.status(404).send({ status: "Babysitter not found" });
        }

        res.status(200).send({ status: "Babysitter updated", babysitter: updatedBabysitter });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
};

const ViewAllSitters = async (req, res) => {
    await User.find({role:"Babysitter", status:{$in: ["pending", "reject"]}} )
        .then((user) => {
            res.status(200).send({ status: "All users", user });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with view all users", error: err.message });
        });
};
// const ViewAllSitters = async (req, res) => {
//     try {
//         const users = await User.find({ role: "Babysitter", status: { $in: ["pending", "reject"] } });
//         const babysitters = await Babysitter.find({}); // You might want to add some filtering criteria here
        
//         res.status(200).send({ status: "All users and babysitters", users, babysitters });
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send({ status: "Error with view all users", error: err.message });
//     }
// };

const ViewAllUsers = async (req, res) => {
    await User.find({status:"active"})
        .then((user) => {
            res.status(200).send({ status: "All users", user });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with view all users", error: err.message });
        });
};


const getParentCount = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("parentID:", userId);
        const parents = await User.find({role:'Parent'});
        res.status(200).send({ status: "Success", count: parents.length});
        
    } 
     catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get number of parents", error: err.message });
    }
};

const getBabysitterCount = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("BabysitterID:", userId);
        const babysitter = await User.find({role:'Babysitter'});
        res.status(200).send({ status: "Success", count: babysitter.length});
        
    } 
     catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get number of babysitters", error: err.message });
    }
};
const getUserCount = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("UserID:", userId);
        const users = await User.find();
        res.status(200).send({ status: "Success", count: users.length});
        
    } 
     catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get number of users", error: err.message });
    }
};

const getComplaintCount = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("ComplaintID:", userId);
        const complaint = await Complaints.find();
        res.status(200).send({ status: "Success", count: complaint.length});
        
    } 
     catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get number of complaint", error: err.message });
    }
};
// const getBabysitter = async (req, res) => {
//     console.log('hi')


//     let babysitterId = req.params.id;
//     console.log("babysitterID:", babysitterId);

        
        
//     try {
//         // await User.find({userId: babysitterId})
//         console.log('hi')
//         const babysitter = await User.findById(babysitterId)
//             .populate('userId', 'role firstName lastName email phone address nic status ')
//             .exec();

//         console.log(babysitter);


//         if (!babysitter.userId._id) {
//             return res.status(404).send({ status: "Babysitter not found" });
//         }

//         const babysitterData = {
//             _id: babysitter.userId._id,
//             role:babysitter.role,
//             firstName: babysitter.userId.firstName,
//             lastName: babysitter.userId.lastName, 
//             email: babysitter.userId.email,
//             phone: babysitter.userId.phone,
//             address: babysitter.userId.address,
//             nic: babysitter.userId.nic, 
//             status:babysitter.status,
//         };
//         console.log(babysitterData)
//         debugger

//         res.status(200).send({ status: "babysitter", babysitter: babysitterData });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send({ status: "Error with get babysitter", error: err.message });
//     }
// };
const getBabysitter = async (req, res) => {
    try {
        let babysitterId = req.params.id;


        console.log("babysitterID:",babysitterId);

        const babysitter = await User.findOne({_id: babysitterId});
        // const activities = parameters.map(parameters => parameters.activity);

        if (!babysitter) {
            res.status(404).send({ status: "No babysitter" });
        } else {
            // const imageFilename = baby.img;
            console.log("babysitter: ", babysitter);
            // const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);

            // console.log("imageFilePath: ", imageFilePath);
            // const imageUrl = `http://localhost:8070/images/${imageFilename}`;


            // Send user information along with the image file
            res.status(200).json({ status: "babysitter", babysitter});
        }
        // if (!Baby || Baby.length === 0) {
        //     res.status(404).send({ status: "No activities found for this ageGroup" });
        // } else {
        //     res.status(200).send({ status: "Baby details", Baby});
        // }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOneUser = async (req, res) => {
    try {
        let userId = req.params.id;


        console.log("userID:",userId);

        const user = await User.findOne({_id: userId});
        // const activities = parameters.map(parameters => parameters.activity);

        if (!user) {
            res.status(404).send({ status: "No user" });
        } else {
            // const imageFilename = baby.img;
            console.log("user: ", user);
            // const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);

            // console.log("imageFilePath: ", imageFilePath);
            // const imageUrl = `http://localhost:8070/images/${imageFilename}`;


            // Send user information along with the image file
            res.status(200).json({ status: "user", user});
        }
        // if (!Baby || Baby.length === 0) {
        //     res.status(404).send({ status: "No activities found for this ageGroup" });
        // } else {
        //     res.status(200).send({ status: "Baby details", Baby});
        // }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOneComplaint = async (req, res) => {
    try {
        let complaintId = req.params.id;


        console.log("complaintId:",complaintId);

        const complaint = await Complaint.findOne({_id: complaintId});

        if (!complaint) {
            res.status(404).send({ status: "No complaint" });
        } else {
            console.log("complaint: ", complaint);
            
            res.status(200).json({ status: "complaint", complaint});
        }
    

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



  


// exports.getDataCount = async (req, res) => {
//   try {
//     const count = await User.countDocuments();
//     res.json({ count });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };



module.exports={
    AddAdmin,
    ViewAdmin,
    UpdateAdmin,
    DeleteAdmin,
    ViewAllBabysitters,
    ViewBabysitter,
    DeleteBabysitter,
    ViewAllParents,
    ViewParent,
    DeleteParent,
    ViewAllComplaint,
    AddSystemInfo,
    UpdateSystemInfo,
    ViewSystemInfo,
    verifyBabysitter,
    addDomainExpert,
    ViewAllExperts,
    ViewAllUsers,
    ViewUser,
    ViewAllSitters,
    getParentCount,
    getBabysitterCount,
    getUserCount,
    getComplaintCount,
    getBabysitter,
    UpdateVerifyStatus,
    getOneUser,
    getOneComplaint
    
};