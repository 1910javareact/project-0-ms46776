import { User } from '../models/User';
import { daoGetUserByUsernameAndPassword, daoGetAlluser, daoGetUserById, daoUpdateUser } from '../repositories/user-dao';
// import { getUserId } from '../services/user-services'

export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User>{
    try {
    return await daoGetUserByUsernameAndPassword(username, password)
} catch (e) {
    throw (e)
}
}

export async function GetAlluser(): Promise<User[]> {
    try {
    return await daoGetAlluser()
} catch (e) {
    throw (e)
}
}

export async function getUserId(id:number): Promise<User> {
    try {
    return await daoGetUserById(id);
    } catch (e) {
        throw e
    }

}

export async function getUpdateUser(req:User) {
    let user = await daoGetUserById(req.userId)
for(let key in req){
    if(req[key] !== undefined && user.hasOwnProperty(key)){

    }
}
    return await daoUpdateUser(user);
    
}