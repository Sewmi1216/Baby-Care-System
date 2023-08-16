const router = require("express").Router();
let Parent = require("../models/Parent");

const parentController = require("../controllers/ParentController");

// Define a middleware function to check for an active session
const checkSession = (req, res, next) => {
    console.log(req.session.user)
    if (req.session && req.session.user) {
        // Session exists, proceed to the next middleware or route handler
        next();
    } else {
        // Session doesn't exist, respond with an error
        return res.status(401).json({ msg: "Unauthorized: Session not active" });
    }
};

//babydetails
router.route('/addBaby').post(checkSession,parentController.addBaby);
//create
router.route('/addParent').post(parentController.addParent);
//router.route('/addTask').post(parentController.addTask);
router.route('/addRequestForm').post(checkSession,parentController.addRequestForm);
// router.route('/addFeedback').post(parentController.addFeedback);
router.route('/addTask').post(checkSession, parentController.addTask);
router.route('/addComplaint').post(checkSession,parentController.addComplaint);

//retrive

//update
router.route("/updateTask/:id").put(checkSession,parentController.updateTask);
router.route("/updateRequestForm/:id").put(checkSession,parentController.updateRequestForm);
router.route("/updateComplaint/:id").put(checkSession,parentController.updateComplaint);

//delete
router.route("/deleteTask/:id").delete(checkSession,parentController.deleteTask);
router.route("/deleteRequestForm/:id").delete(checkSession,parentController.deleteRequestForm);
router.route("/deleteComplaint/:id").delete(checkSession,parentController.deleteComplaint);

//getOne

module.exports = router;