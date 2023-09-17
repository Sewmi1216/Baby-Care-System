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


//create
router.route('/addParent').post(parentController.addParent);
//router.route('/addTask').post(parentController.addTask);
// router.route('/addRequestForm').post(authJwt.verifyParent,parentController.addRequestForm);
// router.route('/addFeedback').post(parentController.addFeedback);

/*Task lists related routes...*/

router.route('/addTaskList').post(authJwt.verifyParent, parentController.addTaskList);
router.route('/getAllTaskListTemplates/:id').get(authJwt.verifyParent, parentController.getAllTaskListTemplates);
//router.route('/getTaskListTemplateForAddDate/:id/:taskListId').get(authJwt.verifyParent, parentController.getTaskListTemplateForAddDate);
//router.route('/deleteTaskListTemplate/:id').delete(parentController.deleteTaskListTemplate);

//router.route('/getTaskList').get(parentController.getTaskList);
//router.route('/updateTaskList/:id').put(parentController.updateTaskList);
//router.route('/deleteTaskList/:id').delete(parentController.deleteTaskList);



router.route('/addComplaint').post(parentController.addComplaint);
//router.route('/addComplaint').post(parentController.addComplaint);


//retrive

//update
//router.route("/updateTask/:id").put(parentController.updateTask);
router.route("/updateRequestForm/:id").put(parentController.updateRequestForm);
router.route("/updateComplaint/:id").put(parentController.updateComplaint);

//delete
//router.route("/deleteTask/:id").delete(parentController.deleteTask);
router.route("/deleteRequestForm/:id").delete(parentController.deleteRequestForm);
router.route("/deleteComplaint/:id").delete(parentController.deleteComplaint);

//getOne

module.exports = router;