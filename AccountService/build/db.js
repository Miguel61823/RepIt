"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: (process.env.POSTGRES_HOST || 'localhost'),
    port: +(process.env.POSTGRES_PORT || 5433),
    database: process.env.POSTRGES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});
exports.pool = pool;
