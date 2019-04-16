import { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import * as uuidv4 from "uuid/v4";
import postgresPool from "../postgresPool";

export class CalendarController {
    private pool: Pool;

    constructor() {
        console.log("Init CalendarController");
        this.pool = postgresPool;
    }

    public addCourtCase = async (req: Request, res: Response) => {
        let newCourtCase = req.body;
        console.log(req.body);
        try {
            // get Latest date
            const calendar = await this.pool.query(`SELECT id, TO_CHAR(date, 'YYYY-MM-DD') as date FROM calendars ORDER BY date DESC LIMIT 1`);
            // if latest date is 'today' + 40 day and is wedneday then ok,
            // else create wedneday which is + 40 (additional function) 
            // insert the record.
            console.log("-----------0---------");
            console.log("rows ", calendar.rows);
            console.log("rowsCount ", calendar.rowCount);

            let someDate = new Date();
            const numberOfDaysToAdd = 40;
            someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
            if (someDate.getDay() !== 3) {
                
            }

            console.log("nextWeekDay ",this.getNextDayOfWeek(new Date(), 3, 40));
            console.log(someDate.getDay());
            // calendar.rows[0].date < someDate.toISOString().slice(0, 10)
            console.log("-----------1---------");
            console.log("-----------11---------", calendar.rows[0].date);
            if (calendar.rowCount > 0 && calendar.rows[0].date < someDate.toISOString().slice(0, 10) || calendar.rowCount === 0) {
                console.log("-----------2---------");
                const text = `INSERT INTO
                calendars(id, date)
                VALUES($1, $2)
                returning *`;

                const newDate = this.getNextDayOfWeek(new Date(), 3, 40);
                console.log("newDate ", newDate);
                const values = [
                    uuidv4(),
                    someDate.toISOString().slice(0, 10),
                ];
                const { rows } = await this.pool.query(text, values);
                return res.status(201).send(rows);
            }
        } catch (err) {
            console.log(err);
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

    private getNextDayOfWeek(date, dayOfWeek: number, offset: number) {
        let someDate = new Date();
        someDate.setDate(someDate.getDate() + offset);

        let resultDate = new Date(someDate.getTime());
        console.log("someDate", someDate);
        console.log("resultDate", resultDate);
        // resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
        resultDate.setDate(someDate.getDate() + ((dayOfWeek + 7 - someDate.getDay()) % 7));
        return resultDate;
    }
}