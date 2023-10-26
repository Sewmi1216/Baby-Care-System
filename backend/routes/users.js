const router = require("express").Router();
let User = require("../models/User");
const userController =require("../controllers/UserController");
const passport = require('passport'); // Assuming you use Passport.js for authentication



router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);
router.route('/forget-password').post(userController.forgetPassword);
// router.route('/resetPassword').post(userController.resetPassword);

module.exports = router;