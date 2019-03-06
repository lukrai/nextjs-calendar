import { Request, Response, NextFunction } from 'express';
import postgresPool from "../postgresPool";

export class UserController {
    private pool;

    constructor () {
       console.log("Init UserController") 
       this.pool = postgresPool;
    }

    public getUser(req, res) {
        return res.json({ param: req.params.id });
    }

    public getUsers = (req, res) => {
        if (!req.user || !req.user.admin || req.user.admin !== true)
            return res.status('403').end();
        let page: number = 1;
        let size: number = 25;
        const query = req.query;
        console.log(Object.entries(query).length);
        console.log(Object.entries(query).length > 0);
        if (Object.entries(query).length > 0 && req.query.page && parseInt(req.query.page) > 0) {
            page = parseInt(req.query.page);
        }

        // const page = (req.query.page && parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1;
        // const sort = (req.query.sort) ? { [req.query.sort]: 1 } : {}

        if (Object.entries(query).length > 0 && req.query.size && parseInt(req.query.size) > 0 && parseInt(req.query.size) < 500) {
            size = parseInt(req.query.size);
        }
        this.pool.query(`SELECT * FROM users ORDER BY last_name LIMIT ${size} OFFSET ${(page - 1) * size}`, (error, results) => {
            if (error) {
                // throw error;
                return res.status('404').send();
            }
            res.status(200).json(results.rows)
        })
    }
}