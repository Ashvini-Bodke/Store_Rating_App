const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tiger",
    database: "store_rating"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        return;
    }
    console.log("MySQL Connected");
});

module.exports = db;