//parent routes
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
router.route('/addRequestForm').post(authJwt.verifyParent,parentController.addRequestForm);
router.route("/getBabysitters").get(authJwt.verifyParent,parentController.getBabysitters);
router.route("/getBabysitters/:id").get(authJwt.verifyParent,parentController.getBabysitter);
router.route("/getRequestForms/:id").get(authJwt.verifyParent,parentController.getRequestForms); //id=parentID
router.route("/deleteRequestForm/:id").delete(authJwt.verifyParent,parentController.deleteRequestForm);
router.route("/updateParent/:id1/:id2").put(authJwt.verifyParent,parentController.updateParent);
router.route("/getRequestForms/:id").get(authJwt.verifyParent,parentController.getRequestForms); //id=parentID
router.route("/getOnlyParent/:id").get(authJwt.verifyParent,parentController.getOnlyParent); //id=parentID
router.route("/getBabiesCount/:id").get(authJwt.verifyParent,parentController.getBabiesCount); //id=parentID
router.route("/getRequestsCount/:id").get(authJwt.verifyParent,parentController.getRequestsCount); //id=parentID
router.route("/updateBabysitter/:id").put(authJwt.verifyParent,parentController.updateBabysitter); //id=babysitterID
router.route("/deleteBabysitter/:id1/:id2").delete(authJwt.verifyParent,parentController.deleteBabysitter); //id=babysitterID
router.route("/deleteRequestFormID/:id1/:id2").get(authJwt.verifyParent,parentController.deleteBabysitter); //id=parentID


//create
router.route('/addParent').post(parentController.addParent);
//router.route('/addTask').post(parentController.addTask);
// router.route('/addRequestForm').post(authJwt.verifyParent,parentController.addRequestForm);
// router.route('/addFeedback').post(parentController.addFeedback);

router.route('/addTaskList').post(parentController.addTask);
router.route('/addComplaint').post(parentController.addComplaint);


//retrive

//update
router.route("/updateTask/:id").put(parentController.updateTask);
router.route("/updateComplaint/:id").put(parentController.updateComplaint);

//delete
router.route("/deleteTask/:id").delete(parentController.deleteTask);
router.route("/deleteRequestForm/:id").delete(parentController.deleteRequestForm);
router.route("/deleteComplaint/:id").delete(parentController.deleteComplaint);

//getOne

module.exports = router;   