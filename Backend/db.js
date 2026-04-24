const mysql = require("mysql12");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
    database: "vliegclub"
})
db.connect((err) =>{
    if(err){
        console.error("Error connection to database: ", err);
    }else{
        console.log("Connected to database");
    }
});

module.exports = db;