
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/movies', function(req, res, next) {
	res.render('movies', { title: '12345' });
});


module.exports = router;
