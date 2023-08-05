let Task = require("../models/task");

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
        res.status(500).send({status: "Error with the task", error: err.message})
    });
};

module.exports = {
    addTask
}