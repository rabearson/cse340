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

module.exports = invCont