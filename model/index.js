const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
const crud = require('./crud')
const conn = require('../connection')

class Backend {

    static saveJsonDB(data) {
        fs.writeFileSync(`${config.db_path}school.json`, JSON.stringify(data, null, 2));
    }

    static jsonDB(callback) {

        fs.readFile(`${config.db_path}/school.json`, (err, data) => {
            if (!err) {
                // console.log(`Database school.json has successfully open`);
                callback(false, JSON.parse(data));
            } else {
                callback(err, null);
            }
        })
    }

    static retrieveDataFromJSON(data, table, callback) {

        let result = data.filter(element => element.table === table)[0].values;
        
        if (result.length == 0) {
            callback(false, null);
        } else {
            callback(false, result)
        }
    }

    static retrieveDataFromPG(table, callback) {

        let querySelector = ''

        switch (table) {
            case 'class' : querySelector = 'show_class'; break;
            default : querySelector = 'show_all'; 
        }

        conn.postgresConnect((err, pool) => {
            if (!err) {
                crud.show(querySelector, pool, table, null, (err, result) => {
                    if (!err) {
                        callback(false, result)
                    } else {
                        callback(err, null)
                    }
                })
            } else {
                callback(err, null)
            }
        })
    }

    static retrieveDataForEditing = (table, properties) => new Promise((resolve, reject) => {
        conn.postgresConnect((err, pool) => {
            if (!err) {
                crud.show('with_filter', pool, table, `${properties.column}=${properties.value}`, (err, result) => {
                    err == false ? resolve(result) : reject(err)
                })
            }
        })
    })

    static searchData(table, params, callback) {
        switch (config.database) {
            case 'postgres' : {
                conn.postgresConnect((err, pool) => {
                    if (!err) {
                        crud.show('with_filter', pool, table, params, (err, result) => {
                            if (!err) {
                                callback(false, result)
                            }
                        })
                    }
                })
            }; break;
        }
    }

    static maintainData(jobType, table, schoolProperties, propertiesID, callback) {

        switch (config.database) {
            // case 'json' : {}
            case 'postgres' : {
                conn.postgresConnect((err, pool) => {
                    if (!err) {

                        switch (jobType) {
                            case 'insert' : {
                                crud.create(pool, table, schoolProperties, (err, res) => {
                                    if (err) {
                                        callback(err, null);
                                    } else {
                                        callback(false, res);
                                    }
                                })
                            }; break;

                            case 'update' : {
                                crud.update(pool, table, propertiesID, schoolProperties, (err, res) => {
                                    if (err) {
                                        callback(err, null)
                                    } else {
                                        callback(false, res);
                                    }
                                })
                            }; break;

                            case 'delete' : {
                                crud.delete(pool, table, propertiesID, (err, res) => {

                                    if (err) {
                                        callback(err, null)
                                    } else {
                                        callback(false, res);
                                    }
                                })
                            }
                        }
                    }
                })
            }; break;
        }
    }
}

module.exports = Backend;