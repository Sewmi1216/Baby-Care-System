let Task = require("../models/task");

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


module.exports = {
    getAllTasks
}