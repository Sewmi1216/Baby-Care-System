const router = require("express").Router();
let Parent = require("../models/Parent");

const parentController = require("../controllers/ParentController");

router.route('/addParent').post(parentController.addParent);


module.exports = router;