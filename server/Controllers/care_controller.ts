import { Router, Request, Response, NextFunction } from 'express';
import { CareModel, Care } from '../Models/care_model';

export namespace CareController
{
    export async function getAll(req: Request, res: Response, next: NextFunction)
    {
        const results = await CareModel.getAll();
        res.json(results);
    }

    export async function getOneByID(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await CareModel.getOneByID(req.params.id);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function createCare(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            console.log(req.body);
            const care = new Care(req.body);
            const results = await CareModel.insertCare(care);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }

    export async function deleteCare(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const results = await CareModel.deleteCareByID(req.params.id);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }
    
    export async function updateCareByID(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const care = new Care(req.body);
            const results = await CareModel.updateCareByID(req.params.id, care);
            res.json(results);
        } catch(err)
        {
            res.status(500).send(err);
        }
    }
}