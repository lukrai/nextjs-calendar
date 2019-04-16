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
        this.seedUsers();
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
              first_name VARCHAR(128) NOT NULL,
              last_name VARCHAR(128) NOT NULL,
              email VARCHAR(128) NOT NULL,
              password VARCHAR(128),
              phone_number VARCHAR(128) NOT NULL,
              court VARCHAR(128) NOT NULL,
              date_created TIMESTAMP,
              date_modified TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS
            calendars(
                id UUID PRIMARY KEY,
                date DATE UNIQUE
            );

            CREATE TABLE IF NOT EXISTS
            courtCases(
                id UUID PRIMARY KEY,
                file_no VARCHAR(128),
                calendar_date DATE REFERENCES calendars(date) ON DELETE RESTRICT,
                time TIME NOT NULL,
                court VARCHAR(128),
                court_no VARCHAR(128),
                first_name VARCHAR(128),
                last_name VARCHAR(128),
                phone_number VARCHAR(128),
                is_disabled BOOLEAN,
                date_created TIMESTAMP,
                date_modified TIMESTAMP
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
              users(id, first_name, last_name, email, phone_number, court, date_created, date_modified)
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
