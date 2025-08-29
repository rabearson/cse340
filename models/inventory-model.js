const pool = require("../database/index")

/******************************
 * Get all classification data
 *******************************/

async function getClassification() {
    const query = 'SELECT * FROM public.classification ORDER BY classification_name'
    return await pool.query(query);
}

async function getInventoryByClassificationId(classificationId) {
    const query = {
        text: `SELECT * FROM public.inventory AS i
        JOIN public.classification AS c
        ON i.classification_id = c.classification_id
        WHERE i.classification_id = $1
        `,
        values: [classificationId]
    }
    try {
        const data = await pool.query(query)
        return data.rows
    } catch (error) {
        console.error("getclassificationbyid error", error)
        throw error
    }
}

async function getInventoryById(inv_id) {
    try {
        const data = await pool.query(`
            SELECT * FROM public.inventory
            WHERE inv_id = $1
        `,
            [inv_id])
        return data.rows[0]
    } catch (error) {
        console.error("getinventorybyid error", error)
        throw error
    }
}

//Insert classification into database
async function addNewClassification(classification_name) {
    try{
        const sql = `INSERT INTO public.classification (classification_name)
        VALUES($1) RETURNING *;`
        const result =  await pool.query(sql, [classification_name])
        return result.rows[0]
    } catch(error){
        throw new Error("Insert failed: " + error.message)
    }
}

//Insert Vehicle into database

async function addNewVehicle(
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
) {
    try {
        const sql = `INSERT INTO public.inventory
        (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;
        `
        return await pool.query(sql, [
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
        ])
    } catch(error) {
        throw new Error(`Insertion failed: ${error.message}`)
    }
    
}
module.exports = { 
    getClassification, 
    getInventoryByClassificationId, 
    getInventoryById,
    addNewClassification,
    addNewVehicle,
 }