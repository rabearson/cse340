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
    try{
        const data = await pool.query(query)
        return data.rows
    }catch(error){
        console.error("getclassificationbyid error", error)
        throw error
    }
}

module.exports = {getClassification, getInventoryByClassificationId}