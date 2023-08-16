 const router = require("express").Router();
 let Admin = require("../models/Admin");
 
 const adminController = require("../controllers/AdminController");

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
// create

 router.route('/addAdmin').post(adminController.AddAdmin);
 router.route('/addSystemInfo').post(checkSession,adminController.AddSystemInfo);


//  retrive

 router.route('/viewAdmin/:id').get(checkSession,adminController.ViewAdmin);

 router.route("/viewBabysitters").get(checkSession,adminController.ViewAllBabysitters);
 router.route("/viewParent/:id").get(checkSession,adminController.ViewBabysitter);

 router.route("/viewParents").get(checkSession,adminController.ViewAllParents);
 router.route("/viewParent/:id").get(checkSession,adminController.ViewParent);

 router.route("/viewComplaint").get(checkSession,adminController.ViewAllComplaints);
 router.route("/viewSystemInfo").get(checkSession,adminController.ViewSystemInfo);

 //update

 router.route("/updateAdmin/:id").put(checkSession,adminController.UpdateAdmin);
 router.route("/updateSystemInfo/:id").put(checkSession,adminController.UpdateSystemInfo);
 router.route("/verifyBabysitter").put(checkSession, adminController.verifyBabysitter);



 //delete

 router.route("/deleteAdmin/:id").delete(checkSession,adminController.DeleteAdmin);
 router.route("/deleteBabysitter/:id").delete(checkSession,adminController.DeleteBabysitter);
 router.route("/deleteParent/:id").delete(checkSession,adminController.DeleteParent);




 module.exports = router;