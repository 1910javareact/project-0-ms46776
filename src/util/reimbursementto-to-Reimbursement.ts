import { Reimbursement } from '../models/reimbursement';
import { ReimbursementDTO } from '../dtos/reimbursement';


export function reimbursementDTOtoReimbursement(r: ReimbursementDTO[]): Reimbursement {
    return new Reimbursement(r[0].reimbursementId, r[0].author, r[0].amount, r[0].dateSubmitted, r[0].dateResolved, r[0].description, r[0].resolver, r[0].status, r[0].type);
}


export function multiReimbursementDTOtoReimbursement(r: ReimbursementDTO[]): Reimbursement[] {
    const result = [];
    for (const reimbursement of r) {
        result.push(reimbursementDTOtoReimbursement([reimbursement]));
    }
    return result;
}