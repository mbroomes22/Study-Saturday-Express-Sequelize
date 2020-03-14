'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
});

Student.beforeSave(student => {
    let first = student.firstName;
    let last = student.lastName;

    student.firstName= first.charAt(0).toUpperCase() + first.slice(1);
    student.lastName= last.charAt(0).toUpperCase() + last.slice(1);
})

module.exports = Student;
