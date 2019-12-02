import express from 'express';
import * as reimbursementServices from '../services/reimbursement-services';

// import { authorization } from '../middleware/authorization-middleware';
import { getReimbursementsByStatusId, getReimbursementsByUserId } from '../services/reimbursement-services';
import { Reimbursement } from '../models/reimbursement';

export const reimbursementRouter = express.Router();
//get reimbursement by status
reimbursementRouter.get('/status/:statusId', //authorization([1]), 
async (req, res) => {
      const statusId = +req.params.statusId;
    if (isNaN(statusId)) {
        res.status(400).send('Invalid ID');
    }
    else {
        try {
            const reimbursements = await getReimbursementsByStatusId(statusId);
        res.json(reimbursements);
        }
        catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

//get reimbursement by user

reimbursementRouter.get('/user/:userId', // 
async (req, res) => {
    const userId = +req.params.userId;
    if (isNaN(userId)) {
        res.status(400).send('Invalid ID');
    }
    else {
        try {
            const reimbursements = await getReimbursementsByUserId(userId);
        res.json(reimbursements);
        } catch (e) {
            res.status(e.status).send(e.message);
        }

    }

});

//submit reimbursement

    reimbursementRouter.post('', async (req, res) => {
        const{body} = req;
        const newR = new Reimbursement (0, 0, 0, 0, 0, ``, 0, 0, 0);
        console.log(req.body.description);
        console.log(req.body.author);
        
                
        for (const key in newR) {
            if (!req.body[key]) {
                res.status(400).send(`Please include all required fields`);
                break;
            } else {
                newR[key] = body[key];
            }
        }
        try {
            const result = await reimbursementServices.postReimbersement(newR);
            if (result != undefined) {
                res.status(201).json('created');
        }
    } catch (e) {
           res.status(e.status).send(e.message);
        }
    });

    reimbursementRouter.patch('',
    async (req, res) => {
        const { body } = req;

        const reimburse = new Reimbursement (0, 0, 0, 0, 0, ``, 0, 0, 0);
for (const key in reimburse) {
        reimburse[key] = body[key];
    }
const id = reimburse.reimbursementId;
if (isNaN(id)) {
    res.status(400).send(`Please enter a valid reimbursement id`);
}
try {
    const result = await reimbursementServices.patchReimbersement(reimburse);
    res.status(201).json(result);
} catch (e) {
    res.status(e.status).send(e.message);
}
});
    //     const patch = {
    //         reimbursementId: body.reimbursementId,
    //         // resolver: req.session.user.userId,
    //         status: body.status
    //     };
    //     // for (const key in patch) {
    //     //     if (!patch[key]) {
    //     //         res.status(400).send('Please include a status and reimbursement Id');
    //     //     }
    //     // }
    //     try {
    //         const newPost = await patchReimbersement(patch);
    //         res.status(201).json(newPost);
    //     } catch (e) {
    //         res.status(e.status).send(e.message);
    //     }
    // });