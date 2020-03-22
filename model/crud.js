"use strict"

class Crud {

    static show(queryType, pool, table, extraParams, callback) {
        switch (queryType) {
            case 'show_all' : {
                pool.query(`select * from ${table};`, (err, result) => {
                    if (!err) {
                        callback(false, result.rows)
                    } else {
                        callback(err, null)
                    }
                })
            }; break;

            case 'with_filter' : {
                pool.query(`select * from ${table} where ${extraParams};`, (err, result) => {
                    if (!err) {
                        callback(false, result.rows)
                    }
                })
            }; break;

            case 'show_class' : {
                // select with join table
                let script = `select c.class_id, s.subjects_name, c.class_date, c.class_time, c.room, t.teacher_name`;
                    script += ` from class as c, subjects as s, teachers as t where c.teachers_id = t.teachers_id and`;
                    script += ` c.subjects_id = s.subjects_id;`

                pool.query(script, (err, result) => {
                    if (!err) {
                        callback(false, result.rows)
                    }
                })
            }
        }
    }

    static update(pool, table, id, columnToUpdate, callback) {

        // compiling sql script
        let script = ''
        for (element in columnToUpdate) {
            if (columnToUpdate[element] == null) {
                delete columnToUpdate[element];
            } else {
                script += `${element} = '${columnToUpdate[element]}', `;
            }
        }

        columnToUpdate = script.substr(0, script.trim().length-1);

        pool.query(`update ${table} set ${columnToUpdate} where ${table}_id = ${id};`, (err, res) => {
            if (!err) {
                callback(false, 'done')
            }
        })
    }

    static delete(pool, table, params, callback) {
        pool.query(`delete from ${table} where ${table}_id = ${params};`, (err, res) => {

            if (!err) {
                callback(false, 'done');
            } else {
                callback(err, null);
            }
        })
    }

    static create(pool, table, columnToInsert, callback) {

        let values = '', column = '';

        for (let element in columnToInsert) {
            column += `${element}, `;
            values += element.indexOf('_id') > 0 ?  `${columnToInsert[element]}, ` : `'${columnToInsert[element]}', `
        }

        column = column.substr(0, column.trim().length - 1);
        values = values.substr(0, values.trim().length - 1);

        pool.query(`insert into ${table} (${column}) values (${values});`, (err, res) => {
            if (!err) {
                callback(false, `1 Row Affecting table ${table}`)
            }
        })
    }
}

module.exports = Crud;