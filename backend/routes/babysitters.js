const router = require("express").Router(); //import router of express package
let Babysitter = require("../models/babysitter"); //import babysitter module
const babysitterController = require("../controllers/babysitterController"); //import babysitter controller

// Define a middleware function to check for an active session
const checkSession = (req, res, next) => {
    if (req.session && req.session.user) {
        // Session exists, proceed to the next middleware or route handler
        next();
    } else {
        // Session doesn't exist, respond with an error
        return res.status(401).json({ msg: "Unauthorized: Session not active" });
    }
};

//create
router.route("/addBabysitter").post(babysitterController.addBabysitter);

//retrive
router.route("/viewBabysitters").get(checkSession,babysitterController.getAllbabysitters);
router.route("/viewTasks").get(checkSession,babysitterController.getAllTasks);
router.route("/viewRequestForms").get(checkSession,babysitterController.getAllRequestForm);

//update
router.route("/updateBabysitter/:id").put(checkSession,babysitterController.updateBabysitter);
router.route("/updateTask/:id").put(checkSession,babysitterController.updateTask);
router.route("/updateRequestForm/:id").put(checkSession,babysitterController.updateRequestForm);

//delete
router.route("/delete/:id").delete(checkSession,babysitterController.deleteBabysitter);

//getOne
router.route("/get/:id").get(checkSession,babysitterController.getBabysitter);
router.route("/getRequestForm/:id").get(checkSession,babysitterController.getRequestForm);


module.exports = router;
