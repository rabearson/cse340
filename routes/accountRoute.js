const express = require("express")
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const router = express.Router()
const regValidate = require("../utilities/account-validation")

// Route to display the login form
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to display the registration form
router.get("/register", utilities.handleErrors(accountController.buildRegister))

//Route to process registration
router.post("/register", regValidate.registrationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))

// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)


module.exports = router