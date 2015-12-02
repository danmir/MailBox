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

module.exports = router;
