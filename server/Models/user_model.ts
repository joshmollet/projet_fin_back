import { connect } from '../Connections/site_laura_db';
import * as bcryptjs from 'bcryptjs';

export class User{
    id: number;
    username: string;
    name: string;
    first_name: string;
    birthdate: Date;
    address: string;
    address_number: number;
    zip_code: number;
    city: string;
    email: string;
    password: string;
    isAdmin: boolean;

    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
        this.first_name = data.first_name;
        this.birthdate = data.birthdate;
        this.address = data.address;
        this.address_number = data.address_number;
        this.zip_code = data.zip_code;
        this.city = data.city;
        this.email = data.email;
        this.password = data.password;
        this.isAdmin = data.isAdmin ? data.isAdmin : 0;
    }
}

export class UserModel{

    public static async getAll(){
        return connect().then((conn) => {
            return conn.query('SELECT * FROM user').then((results) => {
                return results;
            });
        });
    }

    public static async getOneByEmail(email: any){
        return connect().then((conn) => {
            return conn.query('SELECT * FROM user WHERE email=?', email).then((results) => {
                return results;
            });
        });
    }

    public static async getOneByID(id: any){
        return connect().then((conn) => {
            return conn.query('SELECT * FROM user WHERE id=?', id).then((results) => {
                return results;
            });
        });
    }
    
    public static async getOneByName(name: any){
        return connect().then((conn) => {
            return conn.query('SELECT * FROM user WHERE name=?', name).then((results) => {
                return results;
            });
        });
    }

    public static async getOneByUsername(username: any){
        return connect().then((conn) => {
            return conn.query('SELECT * FROM user WHERE username=?', username).then((results) => {
                return results;
            });
        });
    }

    public static async insertUser(user: User)
    {
        return connect().then((conn) => 
        {
            return conn.query('INSERT INTO user (username, name, first_name, birthdate, address, address_number, zip_code, city, email, password, isAdmin) VALUES(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , 0)', 
            [user.username, user.name, user.first_name, user.birthdate, user.address, user.address_number, user.zip_code, user.city, user.email, user.password]).then((results) => 
            {
                return this.getAll();
            });
        });
    }

    public static async deleteUserByID(id: any)
    {
        return connect().then((conn) => 
        {
            return conn.query('DELETE FROM user WHERE id=?', id).then((results) => 
            {
                return this.getAll();
            });
        });
    }

    public static async updateUserByID(id: any, user: User)
    {
        return connect().then((conn) => 
        {
            return conn.query('UPDATE user SET username=?, name=?, first_name=?, birthdate=?, address=?, address_number=?, zip_code=?, city=?, email=?, password=? WHERE id=?', 
            [user.username, user.name, user.first_name, user.birthdate, user.address, user.address_number, user.zip_code, user.city, user.email, user.password, id]).then((results) => 
            {
                return this.getAll();
            });
        });
    }

    public static async updateUserPasswordByEmail(id: any, user: User)
    {
        return connect().then((conn) => 
        {
            return conn.query('UPDATE user SET password=? WHERE email=?', 
            [user.password, user.email]).then((results) => 
            {
                return this.getAll();
            });
        });
    }

    public static async checkPassword(username: string, password: string): Promise<any>
    {
        try
        {
            let res = await connect().then((conn) => 
            {
                return conn.query('SELECT id, username, password, email, isAdmin FROM user WHERE username=?', username).then(
                    (results) =>
                    {
                        return results;
                    });
            });


            const valid = bcryptjs.compare(password, res[0].password);
            if(await valid){
                return { success: true, isAdmin: res[0].isAdmin };
            }

            // if(res[0].password === password)
            // {
            //     return { success: true, isAdmin: res[0].isAdmin };
            // }
        } catch(err)
        {
            console.error('[ERROR] checkPassword username : ' + username + ' password : ' + password);
            console.error(err);
        }
        return { success: false, isAdmin: false };
    }

    public static async updatePassword(user: User)
    {
        return connect().then((conn) => 
        {
            return conn.query('UPDATE user SET password=? WHERE id=?', 
            [user.password, user.id]).then((results) => 
            {
                return this.getOneByID(user.id);
            });
        });
    }
}