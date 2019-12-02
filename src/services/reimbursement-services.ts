import { daoUpdateReimbursement, daoGetReimbursementsByStatusId, daoGetReimbursementsByUserId, daoPostReimbersement, daoGetReimbursementsByReimbursementId } from '../repositories/reimbursement-dao';


export function getReimbursementsByStatusId(statusId: number) {
    try {
        return daoGetReimbursementsByStatusId(statusId);
    } catch (e) {
        throw e;
    }
}


export function getReimbursementsByUserId(userId: number) {
    try {
        return daoGetReimbursementsByUserId(userId);
    } catch (e) {
        throw e;
    }

}


export function postReimbersement(post) {
    try {
        return daoPostReimbersement(post);
    } catch (e) {
        throw e;
    }

}


export async function patchReimbersement(patch) {
    try {
        const post = await daoGetReimbursementsByReimbursementId(patch.reimbursementId);
        for (const key in post) {
            if (patch.hasOwnProperty(key)) {
                post[key] = patch[key];
            }
        }
        return await daoUpdateReimbursement(post);
    } catch (e) {
        throw e;
    }

}

