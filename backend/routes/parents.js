const router = require("express").Router();
let Parent = require("../models/Parent");
const parentController = require("../controllers/ParentController");

//create
router.route('/addParent').post(parentController.addParent);
router.route('/addTask').post(parentController.addTask);

//retrive

//update
router.route("/updateTask/:id").put(parentController.updateTask);

//delete
router.route("/deleteTask/:id").delete(parentController.deleteTask);

//getOne

module.exports = router;