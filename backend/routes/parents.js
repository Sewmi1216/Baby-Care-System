const router = require("express").Router();
let Parent = require("../models/Parent");
const parentController = require("../controllers/ParentController");

router.route('/login').post(parentController.login);
//create
router.route('/addParent').post(parentController.addParent);
router.route('/addTask').post(parentController.addTask);
router.route('/addRequestForm').post(parentController.addRequestForm);
router.route('/addFeedback').post(parentController.addFeedback);

router.route('/addComplaint').post(parentController.addComplaint);

//retrive

//update
router.route("/updateTask/:id").put(parentController.updateTask);
router.route("/updateRequestForm/:id").put(parentController.updateRequestForm);
router.route("/updateComplaint/:id").put(parentController.updateComplaint);

//delete
router.route("/deleteTask/:id").delete(parentController.deleteTask);
router.route("/deleteRequestForm/:id").delete(parentController.deleteRequestForm);
router.route("/deleteComplaint/:id").delete(parentController.deleteComplaint);

//getOne

module.exports = router;