import { PoolClient } from "pg"
import { connectionPool } from "."
import { reimbursement } from "../models/reimbursement"
import { multiReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from "../util/reimbursementto-to-Reimbursement"


export async function daoGetReimbursementsByStatusId(statusId: number){
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM ers_maliha.reimbursement NATURAL JOIN ers_maliha.reimbursementStatus NATURAL JOIN ers_maliha.reimbursementType WHERE status = $1 ORDER BY dateSubmitted DESC',
        [statusId])
        if(result.rowCount === 0){
            throw 'No Reimbursements By That Status'
        }else{
            return multiReimbursementDTOtoReimbursement(result.rows)
        }
    } catch (e) {
        if(e === 'No Reimbursements By That Status'){
            throw {
                status: 404,
                message: 'No Reimbursements By That Status'
            }
        }else{
            throw{
                status:500,
                Message: 'something went wrong with the server, try again later'
            }
        }
        
    } finally {
        client.release()
    }
}

// reimbursements by user id 
export async function daoGetReimbursementsByUserId(userId: number){
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM ers_maliha.reimbursement NATURAL JOIN ers_maliha.reimbursementStatus NATURAL JOIN ers_maliha.reimbursementType WHERE author = $1 ORDER BY dateSubmitted DESC',
        [userId])
        if(result.rowCount === 0){
            throw 'No Reimbursements By That User'
        }else{
            return multiReimbursementDTOtoReimbursement(result.rows)
        }
    } catch (e) {
        if(e === 'No Reimbursements By That User'){
            throw {
                status: 404,
                message: 'No Reimbursements By That User'
            }
        }else{
            throw{
                status:500,
                Message: 'something went wrong with the server, try again later'
            }
        }
        
    } finally {
        client.release()
    }
}

//make a new reimbersement request
export async function daoPostReimbersement(post){
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        client.query('BEGIN')
        await client.query('INSERT INTO ers_maliha.reimbursement (author, amount, dateSubmitted, dateResolved, description, resolver, status, type) values ($1,$2,now(),$3,$4,null,1,$5)',
            [post.author, post.amount, '0001/01/01', post.description, post.type])
        let result = await client.query('SELECT * FROM ers_maliha.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 1 OFFSET 0',
            [post.author])
        client.query('COMMIT')
        return reimbursementDTOtoReimbursement(result.rows)
    }catch(e){
        client.query('ROLLBACK')
        throw{
            status: 500,
            message: 'Internal Server Error'
        }
    }finally{
        client.release()
    }
}

//get a reimbersement by it's id
export async function daoGetReimbursementsByReimbursementId(reimbursementId: number){
    let client: PoolClient
    try{
        client = await connectionPool.connect()        
        let result = await client.query('SELECT * FROM ers_maliha.reimbursement WHERE reimbursement_id = $1',
        [reimbursementId])        
        if(result.rowCount === 0){
            throw 'Reimbursement Does Not Exist'
        }else{
            return reimbursementDTOtoReimbursement(result.rows)
        }
    }catch(e){
        if(e === 'Reimbursement Does Not Exist'){
            throw{
                status: 404,
                message: 'Reimbursement Does Not Exist'
            }
        }else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }finally{
        client.release()
    }
}

//replace a reimbersemnt by it's id
export async function daoUpdateReimbursement(reimbursementUpdate: reimbursement){    
    let client: PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('UPDATE ers_maliha.reimbursement SET dateResolved = now(), resolver = $1, status = $2 WHERE reimbursement_id = $3',
        [reimbursementUpdate.resolver,reimbursementUpdate.status, reimbursementUpdate.reimbursementId])
        return await daoGetReimbursementsByReimbursementId(reimbursementUpdate.reimbursementId)
    }catch(e){
        if(e === 'Reimbursement Does Not Exist'){
            throw{
                status: 404,
                message: 'Reimbursement Does Not Exist'
            }
        }else{
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }finally{
        client.release()
    }
}