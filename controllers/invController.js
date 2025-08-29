const invModel = require("../models/inventory-model")
const utilities = require("../utilities/index")

const invCont = {}

invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classification_id
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
        errors: null,
    })
}


invCont.buildInventoryById = async function (req, res, next) {
    const inventoryId = req.params.inv_id
    const data = await invModel.getInventoryById(inventoryId);
    const vehicle = await utilities.buildVehicleDetail(data)
    let nav = await utilities.getNav()
    const pageTitle = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
    res.render("inventory/vehicle-detail", {
        title: pageTitle,
        nav,
        vehicle,
        errors: null,
    })
}

//BUild management view
invCont.buildManagementView = async (req, res) => {
    const nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Vehicle Management",
        nav,
    })
}

//Build add classification view
invCont.buildAddClassificationView = async function (req, res) {
    const nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
    })
}

/* ****************************************
*  Process Insertion
* *************************************** */
invCont.insertClassification = async (req, res) => {
    const { classification_name } = req.body
    const result = await invModel.addNewClassification(classification_name)
    if (result) {
        let nav = await utilities.getNav()
        req.flash("notice", `${classification_name} classification is inserted successfully`)
        res.status(201).render("inventory/management", {
            title: "Vehicle Management",
            nav,
        })
    }
    else {
        let nav = await utilities.getNav()
        req.flash("error", "Sorry, the insertion of new classification failed")
        res.status(501).render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
        })
    }
}

/* ****************************************
*  Deliver add inventory view
* *************************************** */
invCont.deliverAddInvView = async (req, res) => {
    let nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList()
    res.render("inventory/add-inventory", {
        title: "Add Vehicle",
        nav,
        errors: null,
        classificationList,
    })
}

/* ****************************************
*  Process vehicle insertion
* *************************************** */

invCont.addVehicle = async (req, res, next) => {
    let nav = await utilities.getNav()
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
        classification_id,
    } = req.body

    const result = await invModel.addNewVehicle(
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id,
    )
    if(result) {
        req.flash("notice", `${inv_model} ${inv_make} is added`)
        res.status(201).render("inventory/management", {
            title: "Vehicle Management",
            nav,
            errors: null
        })
    }
    else {
        req.flash("notice", `Sorry, the insertion of new vehicle failed`)
        const classificationList = await utilities.buildClassificationList()
        res.status(501).render("inventory/add-inventory", {
            title: "Add Vehicle",
            nav,
            errors: null,
            classificationList,
        })
    }
}

module.exports = invCont