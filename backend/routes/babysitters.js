const router = require("express").Router(); //import router of express package
let Babysitter = require("../models/babysitter"); //import babysitter module
const babysitterController = require("../controllers/babysitterController"); //import babysitter controller


//create
router.route("/addBabysitter").post(babysitterController.addBabysitter);

//retrive
router.route("/viewBabysitters").get(babysitterController.getAllbabysitters);
router.route("/viewTasks").get(babysitterController.getAllTasks);
router.route("/viewRequestForms").get(babysitterController.getAllRequestForm);

//update
router.route("/updateBabysitter/:id").put(babysitterController.updateBabysitter);
router.route("/updateTask/:id").put(babysitterController.updateTask);
router.route("/updateRequestForm/:id").put(babysitterController.updateRequestForm);

//delete
router.route("/delete/:id").delete(babysitterController.deleteBabysitter);

//getOne
router.route("/get/:id").get(babysitterController.getBabysitter);
router.route("/getRequestForm/:id").get(babysitterController.getRequestForm);


module.exports = router;
