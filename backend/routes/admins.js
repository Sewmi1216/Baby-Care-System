 const router = require("express").Router();
 let Admin = require("../models/Admin");
 
 const adminController = require("../controllers/AdminController");

// create

 router.route('/addAdmin').post(adminController.addAdmin);

//  retrive

 router.route('/viewAdmin/:id').get(adminController.viewAdmin);

 router.route("/viewBabysitter").get(adminController.ViewAllBabysitters);

 router.route("/viewParent").get(adminController.ViewAllParents);

 router.route("/viewComplaint").get(adminController.ViewAllComplaints);

 //update

 router.route("/updateAdmin/:id").put(adminController.updateAdmin);


 //delete

 router.route("/deleteAdmin/:id").delete(adminController.DeleteAdmin);
 router.route("/deleteBabysitter/:id").delete(adminController.DeleteBabysitter);
 router.route("/deleteParent/:id").delete(adminController.DeleteParent);




 module.exports = router;