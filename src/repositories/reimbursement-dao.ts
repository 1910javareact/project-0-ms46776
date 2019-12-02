import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { Reimbursement } from '../models/reimbursement';
import { multiReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from '../util/reimbursementto-to-Reimbursement';

export async function daoGetAllReimbursements(): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM ers_maliha.reimbursement');
        return multiReimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}
export async function daoGetReimbursementsByStatusId(statusId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM ers_maliha.reimbursement where status = $1 ORDER BY datesubmitted DESC', [statusId]);
        // console.log(result.rows);
        if (result.rowCount === 0) {
            throw 'No Reimbursements By That Status';
        } else {
            return multiReimbursementDTOtoReimbursement(result.rows);
        }
    } catch (e) {
        if (e === 'No Reimbursements By That Status') {
            throw {
                status: 404,
                message: 'No Reimbursements By That Status'
            };
        } else {
            throw{
                status: 500,
                Message: 'something went wrong with the server, try again later'
            };
        }

    } finally {
        client.release();
    }
}

// reimbursements by user id
export async function daoGetReimbursementsByUserId(userId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM ers_maliha.reimbursement WHERE author = $1 ORDER BY dateSubmitted DESC',
        [userId]);
        if (result.rowCount === 0) {
            throw 'No Reimbursements By That User';
        } else {
            return multiReimbursementDTOtoReimbursement(result.rows);
        }
    } catch (e) {
        if (e === 'No Reimbursements By That User') {
            throw {
                status: 404,
                message: 'No Reimbursements By That User'
            };
        } else {
            throw{
                status: 500,
                Message: 'something went wrong with the server, try again later'
            };
        }

    } finally {
        client.release();
    }
}

//make a new reimbersement request
export async function daoPostReimbersement(reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        console.log(reimbursement.author);
        
        await client.query('INSERT INTO ers_maliha.reimbursement (author, amount, datesubmitted, dateresolved, description, status, "type") values ($1,$2,$3,$4,$5,1,$6)',
            [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted,reimbursement.dateResolved, reimbursement.description, reimbursement.type]);
console.log('passed the query');

        const result = await client.query('SELECT * FROM ers_maliha.reimbursement WHERE author = $1 ORDER BY reimbursementid DESC LIMIT 1 OFFSET 0',
            [reimbursement.author]);
        
        client.query('COMMIT');
        return reimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        client.query('ROLLBACK');
        throw{
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client.release();
    }
}

//get a reimbersement by it's id
export async function daoGetReimbursementsByReimbursementId(reimbursementId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM ers_maliha.reimbursement WHERE reimbursementid = $1',
        [reimbursementId]);
        if (result.rowCount === 0) {
            throw 'Reimbursement Does Not Exist';
        } else {
            return reimbursementDTOtoReimbursement(result.rows);
        }
    } catch (e) {
        if (e === 'Reimbursement Does Not Exist') {
            throw{
                status: 404,
                message: 'Reimbursement Does Not Exist'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client.release();
    }
}

//replace a reimbersemnt by it's id

export async function daoUpdateReimbursement(r: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        console.log(r.amount);
        
        client.query('BEGIN');
        console.log(r.reimbursementId);
        
        await client.query('UPDATE ers_maliha.reimbursement SET author = $2, amount = $3, datesubmitted = $4, dateresolved = $5, description = $6,resolver = $7, status = $8, type = $9 WHERE reimbursementid = $1',
        [r.reimbursementId, r.author, r.amount, r.dateSubmitted, r.dateResolved, r.description, r.resolver, r.status, r.type]);
        client.query('COMMIT');
    } catch (e) {
        client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client.release();
    }
}