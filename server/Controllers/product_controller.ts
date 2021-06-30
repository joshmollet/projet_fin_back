import { Router, Request, Response, NextFunction } from 'express';
import { ProductModel, Product } from '../Models/product_model';

export namespace ProductController
{
    export async function getAll(req: Request, res: Response, next: NextFunction)
    {
        const results = await ProductModel.getAll();
        res.json(results);
    }

    export async function getOneByRef(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await ProductModel.getOneByRef(req.params.reference);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function createProduct(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            console.log(req.body);
            const product = new Product(req.body);
            const results = await ProductModel.insertProduct(product);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function deleteProduct(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await ProductModel.deleteProductByRef(req.params.reference);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }
    
    export async function updateProductByRef(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const product = new Product(req.body);
            const results = await ProductModel.updateProductByRef(req.params.reference, product);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }
}