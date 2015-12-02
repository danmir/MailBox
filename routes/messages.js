var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.get('/', function(req, res, next) {
  res.render('messages', {});
});

router.get('/:name', function(req, res, next) {
    var messages = [];
    db.each("SELECT user, message FROM messages WHERE user='" + req.params.name + "'", function(err, row) {
        messages.push({m: row.message});
        console.log(row.user, row.message);
    }, function(err, numrows) {
        res.render('messages', {'messages': messages, user: req.params.name});
    });
});

module.exports = router;
