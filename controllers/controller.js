"use strict"

const fs = require('fs');
const backend = require('../model');
const students = require('../model/students');
const teachers = require('../model/teachers');
const subjects = require('../model/subjects');
const classes = require('../model/classes');
const session = require('../model/classSessions');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

class Controller {

    static retrieveData = (views) => new Promise((resolve, reject) => {
        switch (config.database) {
            case 'json' : {
                backend.jsonDB((err, data) => {
                    if (!err) {
                        backend.retrieveDataFromJSON(data, views, (err, result) => {
                            err == false ? resolve(result) : reject(result);
                        })
                    }
                })
            }; break;

            case 'postgres' : {
                backend.retrieveDataFromPG(views, (err, result) => {
                    err == false ? resolve(result) : reject(err)
                })
            }; break;
        }
    })

    static search = (table, parameter) => new Promise((resolve, reject) => {
        backend.searchData(table, parameter, (err, result) => {
            err == false ? resolve(result) : reject(err);
        })
    })

    static insert = (jobType = 'insert', table, properties, propertiesID) => new Promise((resolve, reject) => {

        // validate user input
        for (let el in properties) {
            if (properties[el].trim() === '') {
                return resolve(`/${table}/register?adding=null&status=error&on=${el}`);
            }
        }

        backend.maintainData(jobType, table, properties, null, (err, result) => {
            let registerObject = properties.full_name || properties.subjects_name || properties.teacher_name || 'class schedule';
            err == false ? resolve(`/${table}/register?adding=${registerObject.toLowerCase()}&status=succeeded`) : reject(err)
        })
   
    })

    static update = (jobType = 'update', table, properties, propertiesID) => new Promise((resolve, reject) => {
 
        backend.maintainData(jobType, table, properties, propertiesID, (err, result) => {
            let registerObject = properties.full_name || properties.subjects_name || properties.teacher_name || 'class schedule';
            err == false ? resolve(`/${table}/list?updating=${registerObject}&status=succeeded`) : reject(err)
        })
 
    })

    static delete = (jobType = 'delete', table, propertiesID) => new Promise((resolve, reject) => {

        backend.maintainData(jobType, table, null, propertiesID, (err, result) => {;
            err == false ? resolve(`/${table}/list?deleting=${propertiesID}&status=succeeded`) : reject(err)
        })   

    })
}

module.exports = Controller;