const router = require("express").Router();
const tasksController = require("../controllers/tasks");

router.route("/").get(tasksController.getAllTasks);


module.exports = router;