import { User } from "./models/User";


export let users: User[] = [{
userId: 1,
username: 'Finance Manager',
password: 'password',
firstName: 'Luke',
lastName: 'Skywalker',
email: 'luke.skywalker@starwars.com',
role: 
{
    roleId: 1,
    role: 'Finance Manager',
}
},
{
    userId: 2,
    username: 'Admin',
    password: 'password',
    firstName: 'Darth',
    lastName: 'Vader',
    email: 'darth.vader@starwars.com',
role:
    {
        roleId: 2,
        role: 'Admin',
    },
}];
