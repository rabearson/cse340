const { getClassification } = require("../models/inventory-model")

const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
    const data = await getClassification()
    let list = `<ul>
        <li><a href="/" title="Home page">Home</a></li>`
    data.rows.forEach(row => {
        list += `<li><a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name}">${row.classification_name}</a></li>`
    });
    list += "</ul>"
    return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid = ""
    if(data.length > 0){
        grid += `<ul id="inv-display">`
        data.forEach(vehicle => {
            grid += `<li>
                <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
                    <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">
                </a>
                <div class="namePrice">
                    <h2>
                        <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
                        ${vehicle.inv_make} ${vehicle.inv_model}
                        </a>
                    </h2>
                    <span>$ ${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
                </div>
            </li>`
        })
        grid += "</ul>"
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/********************************
 * Build inventory view
 *******************************/
Util.buildVehicleDetail = async function (data) {
    let vehicle = '<div class="inv-detail">'
    vehicle += `
        <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">
        <div class="vehicle-info">
            <h2>${data.inv_make} ${data.inv_model} Details</h2>
            <P class="info-bg all-para"><b>Price:$${new Intl.NumberFormat("en-US").format(data.inv_price)}</b></p>
            <p class="all-para"><b>Description:</b> ${data.inv_description}</p>
            <p class="info-bg all-para"><b>Color:</b> ${data.inv_color}</p>
            <p class="all-para"><b>Miles:</b> ${new Intl.NumberFormat("en-US").format(data.inv_miles)}</p>
        </div>
    `
    vehicle += "</div>"
    return vehicle
}

Util.buildClassificationList = async function (classification_id = null) {
    let data = await getClassification()
    let classificationList = '<select name="classification_id" id="classificationList" required>'
    classificationList += '<option value="">Choose a Classification</option>'
    data.rows.forEach(row => {
        classificationList += `
        <option value="${row.classification_id}" ${row.classification_id != null && row.classification_id == classification_id ? "selected" : ""}>
            ${row.classification_name}
        </option>`
    })
    classificationList += '</select>'
    return classificationList
}

module.exports = Util