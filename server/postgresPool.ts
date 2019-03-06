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
              created_date TIMESTAMP,
              modified_date TIMESTAMP
            )`;

        this.pool.query(queryText)
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                // console.log(err);
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
                // console.log(err);
            });
    }

    public getPool() {
        if (this.pool) {
            return this.pool;
        }
        this.pool = new Pool(this.config);
        return this.pool;
    }
}


const postgresPool = new PostgresPool();
export default postgresPool.getPool();