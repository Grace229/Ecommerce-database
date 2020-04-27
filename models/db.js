const mysql = require('mysql');
const dbconfig = require('../config/db.config');

const connection = mysql.createConnection({
    host: dbconfig.HOST,
    user: dbconfig.user,
    password: dbconfig.PASSWORD,
    database: dbconfig.db
});
connection.connect(error => {
    if(error) throw error;
    console.log("Database connected ...");
});

module.exports = connection;