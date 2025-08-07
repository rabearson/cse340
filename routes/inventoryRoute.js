const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")


router.get("/type/:classification_id", utilities.handleErrors(invController.buildByClassificationId))

//Build route for getting vehicle detail
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildInventoryById))

module.exports = router