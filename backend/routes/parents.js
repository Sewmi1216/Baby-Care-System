//parent routes
const router = require("express").Router();
let Parent = require("../models/Parent");
const authJwt = require("../middlewares/authJwt");
const parentController = require("../controllers/ParentController");
const babysitterController = require("../controllers/babysitterController");

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({ storage: storage });

router.get('/getParent/:id', parentController.viewParentProfile
); 

router.route('/addBaby').post(upload.single('file'),parentController.addBaby);

//completed
router.route("/getBabies/:id").get(authJwt.verifyParent,parentController.getBabies);
router.route("/getBaby/:id").get(authJwt.verifyParent,parentController.getBaby);
router.route('/addRequestForm').post(authJwt.verifyParent,parentController.addRequestForm);
router.route("/getBabysitters").get(authJwt.verifyParent,parentController.getBabysitters);
router.route("/getBabysitters/:id").get(authJwt.verifyParent,parentController.getBabysitter);
router.route("/getRequestForms/:id").get(authJwt.verifyParent,parentController.getRequestForms); //id=parentID
router.route("/deleteRequestForm/:id").delete(authJwt.verifyParent,parentController.deleteRequestForm);
router.route("/getParameters/:ageGroup").get(authJwt.verifyParent,parentController.getParameters);
router.route("/getAgeGroup").get(authJwt.verifyParent,parentController.getAgeGroup);
router.route("/getVaccineList").get(authJwt.verifyParent,parentController.getVaccineList);
router.route("/updateParent/:id1/:id2").put(authJwt.verifyParent,parentController.updateParent);
router.route("/getRequestForms/:id").get(authJwt.verifyParent,parentController.getRequestForms); //id=parentID
router.route("/getOnlyParent/:id").get(authJwt.verifyParent,parentController.getOnlyParent); //id=parentID
router.route("/getBabiesCount/:id").get(authJwt.verifyParent,parentController.getBabiesCount); //id=parentID
router.route("/getRequestsCount/:id").get(authJwt.verifyParent,parentController.getRequestsCount); //id=parentID
router.route("/updateBabysitter/:id").put(authJwt.verifyParent,parentController.updateBabysitter); //id=babysitterID
router.route("/deleteBabysitter/:id1/:id2").delete(authJwt.verifyParent,parentController.deleteBabysitter); //id=babysitterID
router.route("/deleteRequestFormID/:id1/:id2").get(authJwt.verifyParent,parentController.deleteBabysitter); //id=parentID

//create
router.route('/addParent').post(upload.single('file'), parentController.addParent);

//router.route('/addTask').post(parentController.addTask);
// router.route('/addRequestForm').post(authJwt.verifyParent,parentController.addRequestForm);
// router.route('/addFeedback').post(parentController.addFeedback);
//  router.route('/fillGrowthParameters').post(parentController.completeParameter);

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