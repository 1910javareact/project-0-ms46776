import { Pool } from 'pg';

export const connectionPool: Pool = new Pool({
    user: process.env['ERS_USERNAME'],
    host: process.env['ERS_HOST'],
    database: process.env['ERS_DATABASE'],
    password: process.env['ERS_PASSWORD'],
    port: 5432,
    max: 5,
});
