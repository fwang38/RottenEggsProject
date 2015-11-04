
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
	res.render('index', { title: 'Express' });
});

router.get('/movies', function(req, res, next) {
	res.render('movies', { title: '12345' });
=======
  res.render('index', { title: 'Index' });
});

router.get('/homepage', function(req, res, next) {
	res.render('homepage', {results: null});
>>>>>>> 114173dc3df4947c2d000f596db5623a6c6f494c
});


module.exports = router;
