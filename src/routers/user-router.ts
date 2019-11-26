import express from 'express';




import { authorization } from '../middleware/authorization-middleware';


import { daoGetUserById } from '../repositories/user-dao';
import { GetAlluser, getUpdateUser } from '../services/user-services';


//get all users
export const userRouter = express.Router();
 async function controllerGetUsers(req, res) {
  try {
    const users = await GetAlluser();
    res.json(users);
    } catch (e) {
      res.status(e.status).send(e.message);
}
}
userRouter.get('',  authorization([1]), controllerGetUsers );
//get user by id
userRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
        const users = await daoGetUserById(id);
        res.json(users);
        } catch (e) {
            res.status(e.status).send(e.message);
        }

    }
});

//update user
userRouter.patch('',authorization([2]),async(req,res) =>{
  
  try{
    let {body} = req
    let user = await getUpdateUser(body)
    res.status(200).json(user)
  }catch (e){
    res.status(e.status).send(e.message)
    
}})