let Admin = require("../models/Admin")

const addAdmin = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;
    const nic = req.body.nic;

    const newParent = new Admin({
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
        res.json("Admin Added");
    }).catch((err) => {
        console.log(err);
    })
}


module.exports={
    addAdmin
};