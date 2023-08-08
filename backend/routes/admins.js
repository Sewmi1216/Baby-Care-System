 const router = require("express").Router();
 let Admin = require("../models/Admin");
 
 const adminController = require("../controllers/AdminController");

// create

 router.route('/addAdmin').post(adminController.addAdmin);

//  retrive

 router.route('/viewAdmin').get(adminController.viewAdmin);

 router.route("/viewBabysitter").get(adminController.ViewAllBabysitters);

 router.route("/viewParent").get(adminController.ViewAllParents);

 //update

 router.route("/updateAdmin/:id").put(adminController.updateAdmin);


 //delete

 router.route("/deleteBabysitter/:id").delete(adminController.DeleteBabysitter);




 module.exports = router;