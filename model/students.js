"use strict"

class Students {
    constructor(full_name, email, address, gender, bod) {
        this.full_name = full_name
        this.email = email
        this.students_address = address
        this.students_gender = gender
        this.birth_date = bod
    }

    static getStudentID(db) {
        // filtering goes here
    }
}

module.exports = Students;