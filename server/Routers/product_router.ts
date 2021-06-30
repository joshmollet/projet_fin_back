import { Router } from 'express';
import { ProductController } from '../Controllers/product_controller'

export class ProductRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();

        this.router.get('/', ProductController.getAll);
        this.router.get('/reference/:reference', ProductController.getOneByRef);
        this.router.delete('/:reference', ProductController.deleteProduct);
        this.router.post('/create', ProductController.createProduct);
        this.router.put('/:reference', ProductController.updateProductByRef);
        //this.router.get('/name/:name', ProductController.getOneByName);
    }
}