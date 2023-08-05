const router = require("express").Router();
const tasksController = require("../controllers/tasks");

router.route("/add").post(tasksController.addTask);

module.exports = router;