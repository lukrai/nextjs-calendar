import { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import * as uuidv4 from "uuid/v4";
import postgresPool, { query } from "../postgresPool";
import { availableCalendarTimes } from "../../dto";

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

            // let requestDate = new Date(req.body.date);
            // if(requestDate.getDay() !== 3) {
            //     requestDate = this.getNextDayOfWeek(requestDate, 3, 0);
            //     console.log("Changed date to wedneday ", requestDate);
            // }                
            const requestDate = this.getNextDayOfWeek(new Date(), 3, 40);
            console.log("nextWeekDay ", this.getNextDayOfWeek(new Date(), 3, 40));
            // calendar.rows[0].date < someDate.toISOString().slice(0, 10)
            console.log("-----------1---------");
            console.log("-----------11---------", calendar.rows[0].date);
            let calendarDate = calendar.rows[0].date;
            if (calendar.rowCount > 0 && calendar.rows[0].date < requestDate.toISOString().slice(0, 10) || calendar.rowCount === 0) {
                console.log("-----------2---------");
                const text = `INSERT INTO
                calendars(id, date)
                VALUES($1, $2)
                returning *`;

                const values = [
                    uuidv4(),
                    requestDate.toISOString().slice(0, 10),
                ];
                const { rows } = await this.pool.query(text, values);
                console.log(rows);
                calendarDate = rows[0].date;
            }

            const courtCases = await this.pool.query(`SELECT * FROM courtCases WHERE date = $1`, calendarDate);

            if (courtCases.rowCount < availableCalendarTimes.length * 7) {
                let rowIndex = 0;
                let columnIndex = 0;
                for (let i = 0; i < courtCases.rowCount; i += 1) {
                    columnIndex += 1;
                    if (columnIndex >= 7) {
                        rowIndex += 1;
                        columnIndex = 0;
                    }
                }

                // check if time count is for each rows is less < 7
                // proceed to add
                const values = [
                    uuidv4(),
                    "file_no",
                    calendarDate,
                    availableCalendarTimes[rowIndex],
                    "KAT",
                    "4",
                    "Vardenis",
                    "Pavardenis",
                    "+370",
                ];
                const { rows } = await this.pool.query(`INSERT INTO courtCases(id, file_no, date, time, court, court_no, first_name, last_name, phone_number) VALUES($1, $2) returning *`, values);
                console.log(rows);
                return res.status(201).send(rows);
            } else {
                // get next calendar date
            }
            // return res.status(201).send(rows);
        } catch (err) {
            console.log(err);
            return res.status(404).send();
        }
        return res.json(newCourtCase);
    }

    private getNextDayOfWeek(date, dayOfWeek: number, offset: number) {
        let resultDate = new Date(date.getTime());
        resultDate.setDate(resultDate.getDate() + offset);

        console.log("someDate", date);
        console.log("resultDate", resultDate);

        resultDate.setDate(resultDate.getDate() + ((7 + dayOfWeek - resultDate.getDay()) % 7));
        return resultDate;
    }
}