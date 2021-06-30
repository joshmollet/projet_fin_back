import { Router } from 'express';
import { CareController } from '../Controllers/care_controller'

export class CareRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();

        this.router.get('/', CareController.getAll);
        this.router.get('/id/:id', CareController.getOneByID);
        this.router.delete('/:id', CareController.deleteCare);
        this.router.post('/create', CareController.createCare);
        this.router.put('/:id', CareController.updateCareByID);
        //this.router.get('/name/:name', CareController.getOneByName);
    }
}