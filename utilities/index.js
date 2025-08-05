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


module.exports = Util