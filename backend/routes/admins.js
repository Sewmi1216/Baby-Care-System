 const router = require("express").Router();
 let Admin = require("../models/Admin");

 const adminController = require("../controllers/AdminController");


 router.route('/addAdmin').post(adminController.addAdmin);


 module.exports = router;