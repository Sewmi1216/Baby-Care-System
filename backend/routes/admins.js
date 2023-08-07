 const router = require("express").Router();
 let Admin = require("../models/Admin");
 
 const adminController = require("../controllers/AdminController");


 router.route('/addAdmin').post(adminController.addAdmin);

 router.route('/viewAdmin').get(adminController.viewAdmin);

 router.route("/viewBabysitter").get(adminController.getAllbabysitters);



 module.exports = router;