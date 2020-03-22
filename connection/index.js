"use strict"

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
const {Pool} = require('pg');

class Connection {

    static postgresConnect(callback) {

        const pool = new Pool({
            user: config.pg_user,
            host: config.pg_server,
            database: config.pg_db_name,
            password: config.pg_password,
            port: config.pg_port,
        });

        pool.connect((err, client) => {
            if (!err) {
                callback(null, client)
            } else {
                callback(err, null)
            }
        });
    }

}

module.exports = Connection;