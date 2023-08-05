let Parent = require("../models/Parent");
let Task = require("../models/task");

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
    const status = req.body.status;
    const time = req.body.time;
    const name = req.body.name;
    // const taskCompletedStatus = req.body.taskCompletedStatus;
    const remainderStatus = Boolean(req.body.remainderStatus);

    const newTask = new Task({
        status,
        time,
        name,
        //taskCompletedStatus,
        remainderStatus,
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

module.exports={
    addParent,
    addTask,
};