const router = require("express").Router(); //import router of express package
let Babysitter = require("../modules/babysitter"); //import babysitter module
const babysitterController = require("../controllers/babysitters"); //import babysitter controller

router.route("/").get(babysitterController.getAllbabysitters);

router.route("/add").post(babysitterController.addBabysitter);

router.route("/get/:id").get(babysitterController.getBabysitter);

router.route("/update/:id").put(babysitterController.updateBabysitter);

router.route("/delete/:id").delete(babysitterController.deleteBabysitter);

module.exports = router;
