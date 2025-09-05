const pool = require("../database/index")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
    
    try{
        const sql = `INSERT INTO public.account(
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
        ) VALUES($1, $2, $3, $4, 'Client') RETURNING *`
        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    }catch(error)
    {
        return error.message
    }
}


/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEMail(account_email) {
    try {
        const sql = `SELECT FROM public.account WHERE account_email = $1`
        const email = await pool.query(sql, [account_email])
        return email.rowCount
    }
    catch(error){
        console.error(error.message)
    }
}

async function getAccountByEmail(account_email) {
    const query = `SELECT * FROM public.account WHERE account_email=$1;`
    try {
        const result = await pool.query(query, [account_email])
        return result.rows[0]
    }
    catch(error){
        return new Error("No matching email found")
    }
}

module.exports = {
    registerAccount,
    checkExistingEMail,
    getAccountByEmail,
}