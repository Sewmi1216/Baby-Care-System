const router = require("express").Router(); //import router of express package
let Babysitter = require("../models/babysitter"); //import babysitter module
const babysitterController = require("../controllers/babysitterController"); //import babysitter controller
const authJwt = require("../middlewares/authJwt");
const multer = require('multer')
const path = require('path')

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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

let upload = multer({ storage: storage });
let multipleupload = multer({ storage: storage });



//completed
router.route("/getRequestForms/:id").get(babysitterController.getRequestForms); 
router.route("/getParents").get(babysitterController.getParents); 
router.route("/getParent/:id").get(babysitterController.getParent); 
router.route("/getParentDetails/:id").get(babysitterController.getParentDetails); 
router.route("/getRequestForm/:id").get(babysitterController.getRequestForm); 
router.route("/updateRequestForm/:id").put(babysitterController.updateRequestForm); 

//create
router.route("/addBabysitter").post(multipleupload.array('file'),babysitterController.addBabysitter);

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
router.route("/getTodayTaskList/:id").get(babysitterController.getTodayTaskList);
module.exports = router;
