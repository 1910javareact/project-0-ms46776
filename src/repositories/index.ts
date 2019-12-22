
import { Pool } from 'pg';

require('dotenv').config();
//const pg = require('pg');
const {ERS_USERNAME, ERS_HOST} = process.env;

console.log(`Connection to ${ERS_USERNAME} @ ${ERS_HOST}`);

// export const connectionPool: Pool = new Pool({
//     user: process.env['ERS_USERNAME'],
//     host: process.env['ERS_HOST'],
//     database: process.env['ERS_DATABASE'],
//     password: process.env['ERS_PASSWORD'],
//     port: 5432,
//     max: 5,
// });     

export const connectionPool: Pool = new Pool({
        user: "ms46776",
        host: "ms46776.cvk2ng2gqd8h.us-east-1.rds.amazonaws.com",
        database: "postgres",
        password: "Fordhamuni19!",
        port: 5432,
        max: 5,
    });  

//module.exports = new pg.Pool();