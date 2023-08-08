const router = require("express").Router();
let Parent = require("../models/Parent");
const parentController = require("../controllers/ParentController");

//create
router.route('/addParent').post(parentController.addParent);
router.route('/addTask').post(parentController.addTask);
router.route('/addRequestForm').post(parentController.addRequestForm);
router.route('/addFeedback').post(parentController.addFeedback);

//retrive

//update
router.route("/updateTask/:id").put(parentController.updateTask);
router.route("/updateRequestForm/:id").put(parentController.updateRequestForm);

//delete
router.route("/deleteTask/:id").delete(parentController.deleteTask);
router.route("/deleteRequestForm/:id").delete(parentController.deleteRequestForm);

//getOne

module.exports = router;