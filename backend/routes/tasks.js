const router = require("express").Router();
const tasksController = require("../controllers/taskController");

router.route("/").get(tasksController.getAllTasks);


module.exports = router;