import { Router, Request, Response, NextFunction } from 'express';
import { UserModel, User } from '../Models/user_model';
import * as bcryptjs from 'bcryptjs';

export namespace UserController
{
    export async function getAll(req: Request, res: Response, next: NextFunction)
    {
        const results = await UserModel.getAll();
        res.json(results);
    }

    export async function getOneByEmail(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await UserModel.getOneByEmail(req.params.email);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function getOneByName(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await UserModel.getOneByName(req.params.name);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function getOneByUsername(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await UserModel.getOneByUsername(req.params.username);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function getOneByID(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await UserModel.getOneByID(req.params.id);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function createUser(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const user = new User(req.body);
            bcryptjs.hash(user.password, 10)
                .then(hash => {
                    user.password = hash;
                })
            const results = await UserModel.insertUser(user);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function deleteUser(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await UserModel.deleteUserByID(req.params.id);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }
    
    export async function updateConnectedUser(req: any, res: Response, next: NextFunction)
    {
        try
        {
            // Get with :email from DB
            const result = await UserModel.getOneByEmail(req.params.email);
            const user = new User(result[0]);
            const updatedUser = new User(req.body);
            // Get the username from the token
            const username = req.decoded.username;

            if(username === user.username)
            {
                const results = await UserModel.updateUserByID(req.params.id, updatedUser);
                res.json(results);
            } else 
            {
                res.status(403).send({
                    success: false,
                    message: 'You can\'t change that user.'
                });
            }
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function updateUserPassword(req: any, res: Response, next: NextFunction)
    {
        try
        {
            const user = new User(req.body);
            const username = req.decoded.username;
            if(username === user.username)
            {
                const results = await UserModel.updatePassword(user);
                res.json(results);
            } else 
            {
                res.status(403).send({
                    success: false,
                    message: 'You can\'t change that user.'
                });
            }
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function updateUserByID(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const user = new User(req.body);
            const results = await UserModel.updateUserByID(req.params.id, user);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }
}