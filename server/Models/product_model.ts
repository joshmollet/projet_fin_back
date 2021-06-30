import { connect } from '../Connections/site_laura_db';

export class Product
{
    reference: string;
    name: string;
    stock: number;
    price: number;
    image_url: string;
    description: string;
    emploi: string;
    ingredient: string;

    constructor(data: any)
    {
        this.reference = data.reference;
        this.name = data.name;
        this.stock = data.stock;
        this.price = data.price;
        this.image_url = data.image_url;
        this.description = data.description;
        this.emploi = data.emploi;
        this.ingredient = data.ingredient;
    }
}

export class ProductModel
{
    public static async getAll()
    {
        return connect().then((conn) => 
        {
            return conn.query('SELECT * FROM product').then((results) => 
            {
                return results;
            });
        });
    }

    public static async getOneByRef(reference: any)
    {
        return connect().then((conn) => 
        {
            return conn.query('SELECT * FROM product WHERE reference=?', reference).then((results) =>
            {
                return results;
            });
        });
    }

    public static async insertProduct(product: Product)
    {
        return connect().then((conn) => 
        {
            return conn.query('INSERT INTO product (reference, name, stock, price, image_url, description, emploi, ingredient) VALUES(?, ? , ? , ? , ? , ?, ?, ?)', 
            [product.reference, product.name, product.stock, product.price, product.image_url, product.description, product.emploi, product.ingredient]).then((results) => 
            {
                return this.getAll();
            });
        });
    }

    public static async deleteProductByRef(reference: any)
    {
        return connect().then((conn) => 
        {
            return conn.query('DELETE FROM product WHERE reference=?', reference).then((results) => 
            {
                return this.getAll();
            });
        });
    }

    public static async updateProductByRef(reference: any, product: Product)
    {
        return connect().then((conn) => 
        {
            return conn.query('UPDATE product SET name=?, stock=?, price=?, image_url=?, description=?, emploi=?, ingredient=? WHERE reference=?', 
            [product.name, product.stock, product.price, product.image_url, product.description, product.emploi, product.ingredient, reference]).then((results) => 
            {
                return this.getAll();
            });
        });
    }
}