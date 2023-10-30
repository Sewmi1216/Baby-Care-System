const router = require("express").Router();
let User = require("../models/User");
const userController =require("../controllers/UserController")



router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);
router.route('/getUser/:id').get(userController.getUser);
router.route('/getImg/:id').get(userController.getImg);
module.exports = router;