import { connect } from '../Connections/site_laura_db';

export class Care
{
    id?: number;
    name: string;
    duration: number;
    price: number;
    description: string;

    constructor(data: any)
    {
        this.id = data.id;
        this.name = data.name;
        this.duration = data.duration;
        this.price = data.price;
        this.description = data.description;
    }
}

export class CareModel
{
    public static async getAll()
    {
        return connect().then((conn) => 
        {
            return conn.query('SELECT * FROM care').then((results) => 
            {
                return results;
            });
        });
    }

    public static async getOneByID(id: any)
    {
        return connect().then((conn) => 
        {
            return conn.query('SELECT * FROM care WHERE id=?', id).then((results) =>
            {
                return results;
            });
        });
    }

    public static async insertCare(care: Care)
    {
        return connect().then((conn) => 
        {
            console.log(care.duration);
            return conn.query('INSERT INTO care (name, duration, price, description) VALUES(? , ? , ? , ?)', 
            [care.name, care.duration, care.price, care.description]).then((results) => 
            {
                return this.getAll();
            });
        });
    }

    public static async deleteCareByID(id: any)
    {
        return connect().then((conn) => 
        {
            return conn.query('DELETE FROM care WHERE id=?', id).then((results) => 
            {
                return this.getAll();
            });
        });
    }

    public static async updateCareByID(id: any, care: Care)
    {
        return connect().then((conn) => 
        {
            return conn.query('UPDATE care SET name=?, duration=?, price=?, description=? WHERE id=?', 
            [care.name, care.duration, care.price, care.description, id]).then((results) => 
            {
                return this.getAll();
            });
        });
    }
}