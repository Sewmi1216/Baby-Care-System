let Admin = require("../models/Admin");
let Babysitter = require("../models/babysitter");

const addAdmin = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;
    const nic = req.body.nic;

    const newAdmin = new Admin({
        firstName,
        lastName,
        email,
        phone,
        address,
        password,
        nic
    })
    //then->js promise||like if else condition
    newAdmin.save().then(() => {
        res.json("Admin Added");
    }).catch((err) => {
        console.log(err);
    })
};

const viewAdmin = async (req, res) => {
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
const updateAdmin = async (req, res) => {
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


module.exports={
    addAdmin,
    viewAdmin,
    updateAdmin,
    getAllbabysitters,
};