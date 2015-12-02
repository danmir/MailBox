var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.get('/', function(req, res, next) {
    var counter = [];
    db.each("SELECT count(*) AS n, url FROM counter GROUP BY url ORDER BY count(*) DESC", function(err, row) {
        counter.push({url: row.url, n: row.n});
    }, function(err, numrows) {
        res.render('counter', {counter: counter});
    });
});

module.exports = router;
