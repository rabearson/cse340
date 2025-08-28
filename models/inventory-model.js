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
module.exports = { 
    getClassification, 
    getInventoryByClassificationId, 
    getInventoryById,
    addNewClassification,
 }