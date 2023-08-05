const router = require("express").Router(); //import router of express package
let Babysitter = require("../models/babysitter"); //import babysitter module
const babysitterController = require("../controllers/babysitterController"); //import babysitter controller


//create
router.route("/addBabysitter").post(babysitterController.addBabysitter);

//retrive
router.route("/viewBabysitter").get(babysitterController.getAllbabysitters);
router.route("/viewTask").get(babysitterController.getAllTasks);

//update
router.route("/updateBabysitter/:id").put(babysitterController.updateBabysitter);
router.route("/updateTask/:id").put(babysitterController.updateTask);

//delete
router.route("/delete/:id").delete(babysitterController.deleteBabysitter);

//getOne
router.route("/get/:id").get(babysitterController.getBabysitter);

module.exports = router;
