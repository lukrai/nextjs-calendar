import { NextFunction, Request, Response } from 'express';
import { Pool } from 'pg';
import postgresPool from "../postgresPool";
import uuidv4 from 'uuid/v4';

export class CalendarController {
    private pool: Pool;

    constructor() {
        console.log("Init CalendarController");
        this.pool = postgresPool;
    }

    public async addCourtCase(req: Request, res: Response) {
        let newCourtCase = req.body;
        console.log(req.body);
        try {
            // get Latest date
            await this.pool.query(`SELECT * FROM calendars`);
            // if latest date is 'today' + 40 day and is wedneday then ok,
            // else create wedneday which is + 40 (additional function) 
            // insert the record.
            const text = `INSERT INTO 
            calendars(id, date)
            VALUES($1, $2)
            returning *`;

            const values = [
                uuidv4(),
                new Date().toISOString().slice(0, 10),
            ];
            const { rows } = await this.pool.query(text, values);

        } catch (err) {
            // console.log(err);
        }
        return res.json(newCourtCase);
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