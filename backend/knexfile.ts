import path from 'path';

const mysql = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'geranid'
    },
    
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
};

const sqlite = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};

module.exports = sqlite;