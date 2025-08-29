const utilities = require("./index")
const { body, validationResult } = require("express-validator")
const accountModel = require("../models/account-model")
const validate = {}

validate.registrationRules = () => {
    return [
        //firstname is required and must be string
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("please provide a first name"),

        //lastname is required and must be string
        body("account_lastname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name"),

        //valid email is required and cannot be already exist in the database
        body("account_email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required.")
            .custom(async (account_email) => {
                const emailExist = await accountModel.checkExistingEMail(account_email)
                if (emailExist) {
                    throw new Error("Email exists. Please log in or use different email")
                }
            }),

        //password is required and must be strong password
        body("account_password")
            .trim()
            .notEmpty()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements.")
    ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */

validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        })
        return
    }
    next()
}

validate.loginRules = function () {
    return [
        body("account_email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Please provide valid email"),

        body("account_password")
            .trim()
            .notEmpty()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Please provide correct password")
    ]
}

validate.checkLogData = async (req, res, next) => {
    const { account_email } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/login", {
            errors,
            nav,
            title: "Login",
            account_email,
        })
        return
    }
    next()
}

validate.addClassificationRules = function () {
    return [
        body("classification_name")
            .trim()
            .escape()
            .isLength({
                min: 2
            })
            .withMessage('Classification name must be at least 2 characters long.')
            .notEmpty()
            .withMessage('Classification name is required.')
            .isAlpha()
            .withMessage('Classification name can only contain alphabetic characters.')
    ]
}

validate.checkaddClassification = async (req, res, next) => {
    const { classification_name } = req.body
    let nav = await utilities.getNav()
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("inventory/add-classification", {
            errors,
            nav,
            title: "Add New Classification",
            classification_name,
        })
        return
    }
    next()
}

validate.addVehicleRules = function () {
    return [
        // Vehicle Make
        body("inv_make")
            .trim()
            .escape()
            .notEmpty().withMessage("Provide vehicle make")
            .isLength({ min: 3 }).withMessage("Make must be 3 letters or more"),

        // Vehicle Model
        body("inv_model")
            .trim()
            .escape()
            .notEmpty().withMessage("Provide vehicle model")
            .isLength({ min: 3 }).withMessage("Model must be 3 letters or more"),

        // Vehicle Year
        body("inv_year")
            .notEmpty().withMessage("Please provide car year")
            .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
            .withMessage("Year must be a valid 4-digit number (between 1886 and next year)"),

        // Vehicle Description
        body("inv_description")
            .trim()
            .escape()
            .notEmpty().withMessage("Please provide a description")
            .isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),

        // Vehicle Price
        body("inv_price")
            .notEmpty().withMessage("Please provide car price")
            .isFloat({ min: 0 }).withMessage("Price must be a positive number")
            .toFloat(),

        // Vehicle Miles
        body("inv_miles")
            .notEmpty().withMessage("Please provide car mileage")
            .isInt({ min: 0 }).withMessage("Mileage must be a non-negative whole number")
            .toInt(),

        // Vehicle Color
        body("inv_color")
            .trim()
            .escape()
            .notEmpty().withMessage("Please provide car color")
            .matches(/^[a-zA-Z\s]+$/).withMessage("Color must contain only letters and spaces"),
    ]
}
validate.checkAddVehicle = async (req, res, next) => {
    const nav = await utilities.getNav()
    
    const {
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
    } = req.body
    const classificationList = await utilities.buildClassificationList(classification_id)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.render("inventory/add-inventory", {
            title: "Add Vehicle",
            nav,
            errors,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classificationList,
        })
    }
    next()
}

module.exports = validate
