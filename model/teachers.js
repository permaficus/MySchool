"use strict"

class Teachers {
    constructor(full_name, email, gender, expertise) {
        this.teacher_name = full_name
        this.email = email
        this.gender = gender
        this.teachers_expertise = expertise
    }

    static getTeachersID(db) {
        // filtering goes here
    }
}

module.exports = Teachers;