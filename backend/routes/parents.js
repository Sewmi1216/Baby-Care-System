const router = require("express").Router();
let Parent = require("../models/Parent");
const authJwt = require("../middlewares/authJwt");
const parentController = require("../controllers/ParentController");
const babysitterController = require("../controllers/babysitterController");

router.get('/getParent/:id', parentController.viewParentProfile
);

router.route('/addBaby').post(parentController.addBaby);

//completed
router.route("/getBabies/:id").get(authJwt.verifyParent,parentController.getBabies);


//create
router.route('/addParent').post(parentController.addParent);
//router.route('/addTask').post(parentController.addTask);
router.route('/addRequestForm').post(parentController.addRequestForm);
// router.route('/addFeedback').post(parentController.addFeedback);

router.route('/addTaskList').post(parentController.addTask);
router.route('/getTaskList').post(parentController.getTaskList);

router.route('/addComplaint').post(checkSession,parentController.addComplaint);
//router.route('/addComplaint').post(parentController.addComplaint);


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