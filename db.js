var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('counter.db');
db.run("CREATE TABLE if not exists messages (user TEXT, message TEXT)");
db.run("CREATE TABLE if not exists counter (url TEXT)");

module.exports = db;