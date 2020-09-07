import knex from 'knex';
import path from 'path';

const mysql = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'geranid'
    },
});

const sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

const connection = sqlite;

export default connection;