const express = require("express")
const router = express.Router()
const errorController = require("../controllers/errorContainer")
const utilities = require("../utilities/index")

router.get("/error", utilities.handleErrors(errorController.createIntentionalError))

module.exports = router