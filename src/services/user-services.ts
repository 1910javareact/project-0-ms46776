import { User } from '../models/user';
import { daoGetUserByUsernameAndPassword, daoGetAlluser, daoGetUserById, daoUpdateUser } from '../repositories/user-dao';
// import { getUserId } from '../services/user-services'

export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    try {
    return await daoGetUserByUsernameAndPassword(username, password);
} catch (e) {
    throw (e);
}
}

export async function GetAlluser(): Promise<User[]> {
    try {
    return await daoGetAlluser();
} catch (e) {
    throw (e);
}
}

// export async function getUserId(id: number): Promise<User> {
//     try {
//     return await daoGetUserById(id);
//     } catch (e) {
//         throw e;
//     }

// }

export async function getUpdateUser(req: User) {
    const user = await daoGetUserById(req.userId);
for (const key in req) {
    if (req[key] !== undefined && user.hasOwnProperty(key)) {
    user[key]= (req[key]);
    }
}
    return await daoUpdateUser(user);

}