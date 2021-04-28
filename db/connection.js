const mysql = require('mysql2');
const util = require('util');

//connect to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees',
    port: 3306
});
db.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId + "\n");
    // start();
  });
db.query = util.promisify(db.query);
module.exports = db;