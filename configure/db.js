const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ashu@2005", 
  database: "login_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Database Connection Failed:", err.message);
    return;
  }

  console.log(" MySQL Connected Successfully");
});

module.exports = connection;
