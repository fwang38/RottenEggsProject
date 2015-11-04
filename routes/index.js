var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/homepage', function(req, res, next) {
	res.render('homepage', {results: null});
});

module.exports = router;
