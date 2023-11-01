 const router = require("express").Router();
 let Admin = require("../models/Admin");

 const authJwt = require("../middlewares/authJwt");

 
 const adminController = require("../controllers/AdminController");

 // Define a middleware function to check for an active session
//  const checkSession = (req, res, next) => {
//   if (req.session && req.session.user) {
//    // Session exists, proceed to the next middleware or route handler
//    next();
//   } else {
//    // Session doesn't exist, respond with an error
//    return res.status(401).json({ msg: "Unauthorized: Session not active" });
//   }
//  };
// create

 router.route('/addAdmin').post(adminController.AddAdmin);
 router.route('/addSystemInfo').post(adminController.AddSystemInfo);
 router.route('/addDomainexpert').post(adminController.addDomainExpert);


//  retrive

 router.route('/viewAdmin/:id').get(adminController.ViewAdmin);

 router.route("/viewBabysitters").get(adminController.ViewAllBabysitters);
 router.route("/viewBabysitter/:id").get(adminController.ViewBabysitter);

 router.route("/viewParents").get(adminController.ViewAllParents);
 router.route("/viewParent/:id").get(adminController.ViewParent);
 router.route("/viewUser/:id").get(adminController.ViewUser);

//  router.route("/viewComplaint").get(adminController.ViewAllComplaints);
 router.route("/viewSystemInfo").get(adminController.ViewSystemInfo);
 router.route("/getAllExperts").get(adminController.ViewAllExperts);
 router.route("/getAllUsers").get(adminController.ViewAllUsers);
 router.route("/getAllBabysitters").get(adminController.ViewAllSitters);

 
 router.route("/getAllComplaints").get(adminController.ViewAllComplaint);
 router.route("/getParentCount/:id").get(adminController.getParentCount); //id=parentID
 router.route("/getBabysitterCount/:id").get(adminController.getBabysitterCount); //id=parentID
 router.route("/getUserCount/:id").get(adminController.getUserCount); //id=parentID
 router.route("/getComplaintCount/:id").get(adminController.getComplaintCount); //id=parentID

 router.route("/getBabysitters/:id").get(adminController.getBabysitter);
 router.route("/getOneUser/:id").get(adminController.getOneUser);
 router.route("/getOneComplaint/:id").get(adminController.getOneComplaint);






 

//  router.route("/dataCount").get(adminController.getDataCount);

// router.get('/fieldCount', adminController.getFieldCount);




 //update

 router.route("/updateAdmin/:id").put(adminController.UpdateAdmin);
 router.route("/updateSystemInfo/:id").put(adminController.UpdateSystemInfo);

 router.route("/updateVerifyStatus/:id").put(adminController.UpdateVerifyStatus);

 router.route("/verifyBabysitter").put(adminController.verifyBabysitter);



 //delete

 router.route("/deleteAdmin/:id").delete(adminController.DeleteAdmin);
 router.route("/deleteBabysitter/:id").delete(adminController.DeleteBabysitter);
 router.route("/deleteParent/:id").delete(adminController.DeleteParent);




 module.exports = router;