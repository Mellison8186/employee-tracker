const mysql = require('mysql2');

//connect to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees'
});

module.exports = db;