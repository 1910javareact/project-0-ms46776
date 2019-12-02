// import { role } from './role';

export class User {
    userId: number ;
	username: string; // not null, unique
	password: string; // not null
	firstName: string; // not null
	lastName: string; // not null
    email: string; // not null
    role: number;
    constructor(userid: number,username: string, password: string, firstname: string, lastname: string, email: string, role: number) {
        this.userId= userid;
        this.username = username;
        this.password = password;
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.role = role;

    }
}