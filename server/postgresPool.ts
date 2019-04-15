// const Pool = require('pg').Pool;
import { Pool } from "pg";
import * as uuidv4 from "uuid/v4";

class PostgresPool {
    private pool: Pool;
    private config = {
        user: 'me',
        host: 'localhost',
        database: 'api',
        password: 'Password12',
        port: 5432,
    }

    constructor() {
        this.pool = new Pool(this.config);
        console.log("Pool initiated.");
        this.createTables();
        // this.seedUsers();
    }

    public getPool(): Pool {
        if (this.pool) {
            return this.pool;
        }
        this.pool = new Pool(this.config);
        return this.pool;
    }

    private createTables() {
        const queryText =
            `CREATE TABLE IF NOT EXISTS
            users(
              id UUID PRIMARY KEY,
              firstName VARCHAR(128) NOT NULL,
              lastName VARCHAR(128) NOT NULL,
              email VARCHAR(128) NOT NULL,
              password VARCHAR(128),
              phoneNumber VARCHAR(128) NOT NULL,
              court VARCHAR(128) NOT NULL,
              dateCreated TIMESTAMP,
              dateModified TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS
            calendars(
                id UUID PRIMARY KEY,
                date DATE UNIQUE
            );

            CREATE TABLE IF NOT EXISTS
            courtCases(
                id UUID PRIMARY KEY,
                fileNo VARCHAR(128),
                calendarDate DATE REFERENCES calendars(date) ON DELETE RESTRICT,
                time TIME NOT NULL,
                court VARCHAR(128),
                courtNo VARCHAR(128),
                firstName VARCHAR(128),
                lastName VARCHAR(128),
                phoneNumber VARCHAR(128),
                isDisabled BOOLEAN,
                dateCreated TIMESTAMP,
                dateModified TIMESTAMP
            );
            `;

        this.pool.query(queryText)
            .then((res) => {
                console.log("CREATE TABLES IF NOT EXISTS", res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    private seedUsers() {
        const queryText = `INSERT INTO
              users(id, first_name, last_name, email, phone_number, court, created_date, modified_date)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8)
              returning *`;
        const values = [
            "851c8742-ee82-44ee-80fe-057eed039bd1",
            "Name",
            "Suname",
            "name.surname@gmail.com",
            "+37012345678",
            "KAT",
            new Date(),
            new Date()
        ];

        this.pool.query(queryText, values)
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const postgresPool = new PostgresPool();
export default postgresPool.getPool();