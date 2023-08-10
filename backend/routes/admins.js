 const router = require("express").Router();
 let Admin = require("../models/Admin");
 
 const adminController = require("../controllers/AdminController");

// create

 router.route('/addAdmin').post(adminController.AddAdmin);
 router.route('/addSystemInfo').post(adminController.AddSystemInfo);


//  retrive

 router.route('/viewAdmin/:id').get(adminController.ViewAdmin);

 router.route("/viewBabysitters").get(adminController.ViewAllBabysitters);
 router.route("/viewParent/:id").get(adminController.ViewBabysitter);

 router.route("/viewParents").get(adminController.ViewAllParents);
 router.route("/viewParent/:id").get(adminController.ViewParent);

 router.route("/viewComplaint").get(adminController.ViewAllComplaints);
 router.route("/viewSystemInfo").get(adminController.ViewSystemInfo);

 //update

 router.route("/updateAdmin/:id").put(adminController.UpdateAdmin);
 router.route("/updateSystemInfo/:id").put(adminController.UpdateSystemInfo);



 //delete

 router.route("/deleteAdmin/:id").delete(adminController.DeleteAdmin);
 router.route("/deleteBabysitter/:id").delete(adminController.DeleteBabysitter);
 router.route("/deleteParent/:id").delete(adminController.DeleteParent);




 module.exports = router;