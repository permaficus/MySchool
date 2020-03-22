"use strict"

class SchoolClass {
    constructor(class_time = new Date(Date.now()), teachers, subjects, room) {
        this.class_time = class_time
        this.teacher = teachers
        this.subjects = subjects
        this.room = room
    }

    static getClassID() {
        // filtering goes here
    }
}

module.exports = SchoolClass;