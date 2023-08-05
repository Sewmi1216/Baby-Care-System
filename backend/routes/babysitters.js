const router = require("express").Router(); //import router of express package
let Babysitter = require("../models/babysitter"); //import babysitter module
const babysitterController = require("../controllers/babysitterController"); //import babysitter controller

router.route("/viewBabysitter").get(babysitterController.getAllbabysitters);
router.route("/viewTask").get(babysitterController.getAllTasks);

router.route("/addBabysitter").post(babysitterController.addBabysitter);

router.route("/get/:id").get(babysitterController.getBabysitter);

router.route("/update/:id").put(babysitterController.updateBabysitter);

router.route("/delete/:id").delete(babysitterController.deleteBabysitter);

module.exports = router;
