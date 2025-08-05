const {Pool} = require("pg")
require("dotenv").config()

/******************
 * Connection pool
 * SSL Object needed for local testing of app
 * But will cause problem in production environment
 * If - else will make determination of what to use
********************/

let pool
if(process.env.NODE_ENV == 'development'){
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
    })

    module.exports = {
        async query(text, params){
            try{
                const result = await pool.query(text, params)
                console.log("Executed query", {text})
                return result
            }catch(error){
                console.error("Error in query", {text})
                throw error
            }
        }
    }
}
else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    })
    module.exports = pool
}