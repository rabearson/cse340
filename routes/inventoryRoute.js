const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const validate = require("../utilities/account-validation")


router.get("/type/:classification_id", utilities.handleErrors(invController.buildByClassificationId))

//Build route for getting vehicle detail
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildInventoryById))

//Deliver management view
router.get("/", utilities.handleErrors(invController.buildManagementView))

//Deliver add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView))

//Route to process classification adding
router.post("/add-classification", 
    validate.addClassificationRules(),
    validate.checkaddClassification,
    utilities.handleErrors(invController.insertClassification)
)

//route to add-inventory
router.get("/add-inventory", utilities.handleErrors(invController.deliverAddInvView))

//Route to process adding of vehicle
router.post("/add-inventory", utilities.handleErrors(invController.addVehicle))

module.exports = router