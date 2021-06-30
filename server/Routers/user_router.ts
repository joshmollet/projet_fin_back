import { Router } from 'express';
import { UserController } from '../Controllers/user_controller'

export class UserRouter
{
    public router: Router;

    constructor()
    {
        this.router = Router();

        this.router.get('/', UserController.getAll);
        this.router.get('/email/:email', UserController.getOneByEmail);
        this.router.get('/id/:id', UserController.getOneByID);
        this.router.get('/name/:name', UserController.getOneByName);
        this.router.get('/username/:username', UserController.getOneByUsername);
        this.router.delete('/:id', UserController.deleteUser);
        this.router.post('/create', UserController.createUser);
        this.router.put('/:email', UserController.updateUserByID);
        //this.router.get('/name/:name', UserController.getOneByName);
    }
}