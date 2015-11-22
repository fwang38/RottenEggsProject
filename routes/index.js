var express = require('express');
var router = express.Router();
var mysql = require('mysql');



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index',{results:null, resultsmovie:null, resultsperson:null});
});

//, resultsperson:null
router.get('/homepage', function(req, res, next) {
	
	res.render('homepage', {results: null});
});

router.get('/comment', function(req, res, next) {
	res.render('comment', {results: null});
});

module.exports = router;