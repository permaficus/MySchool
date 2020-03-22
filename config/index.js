"use strict"

const fs = require('fs');
const pgtool = require('pgtools')
const {Pool} = require('pg')
const sql = require('../database/school.js')

class DatabaseSetup {
    constructor(ListeningPort = 3000, User, databaseName, Password, DatabasePort, HostName = 'localhost', DefaultDB, dbExist = 'yes') {
        this.pg_user = User
        this.pg_db_name = databaseName
        this.pg_password = Password
        this.pg_server = HostName
        this.pg_port = DatabasePort
        this.db_created = dbExist
        this.database = DefaultDB
        /* default port for express */
        this.port = ListeningPort
        this.router = "../router/index.js"
        this.views = "../views/index.ejs"
        /* non essential for setup */
        this.activeMenu = 'setup'
        this.treeView = 'setup'
    }
}

class Job {

    static initializeSetup = config => new Promise((resolve, reject) => {

        let ObjectFile = {
            port: config.port, 
            pg_user: config.pg_user, 
            pg_db_name: config.pg_db_name, 
            pg_server: config.pg_server,
            pg_password: config.pg_password,
            pg_port: config.pg_port,
            db_created: 'yes',
            database: 'postgres',
            db_path: './database/',
            router: '../router/index.js',
            views: '../views/index.ejs'
        }

        fs.writeFileSync('./config/config.json', JSON.stringify(ObjectFile, null, 2))

        // executing sql script
        const pool = new Pool({
            user: config.pg_user,
            host: config.pg_server,
            database: config.pg_db_name,
            password: config.pg_password,
            port: config.pg_port,
        });

        pool.connect((err, client) => {
            if (!err) {
                client.query(sql, (err, res) => {
                    !err ? resolve('index') : console.log(err);
                })
            } else {
                reject(err);
            }
        });

    })
}

module.exports = {DatabaseSetup, Job};