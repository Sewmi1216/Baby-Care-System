let Parent = require("../models/Parent")

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


module.exports={
    addParent
};