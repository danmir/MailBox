var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.use('/send', function(req, res, next) {
    if (req.method === 'POST') {
        if (req.body.user && req.body.message) {
            var stmt = db.prepare("INSERT INTO messages VALUES (?,?)");
            stmt.run(req.body.user, req.body.message);
            res.render('index', { message: 'Сообщение послано' });
        } else {
            res.render('index', { message: 'Не хватает параметров' });
        }
    } else {
        res.redirect('/');
    }
    console.log(req.body);
});

// Для автодополнения
router.use('/allusers', function(req, res, next) {
    console.log(req.body.user);
    var users = [];
    db.each("SELECT user, message FROM messages WHERE user LIKE '%" + "" + req.body.user + "%'", function(err, row) {
        users.push(row.user);
        // console.log(row.user);
    }, function(err, numrows) {
        console.log(users);
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify({
            users: users
        });
        res.end(json);
    });
});

module.exports = router;
