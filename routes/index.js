var express = require('express');
var router = express.Router();
var mysql = require('mysql');



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index',{results:null, resultsperson:null, resultsmovie:null, user:req.user});
});

//, resultsperson:null
//router.get('/homepage', function(req, res, next) {
//	
//	res.render('homepage', {results: null});
//});

router.get('/comment', function(req, res, next) {
	res.render('comment', {results: null});
});

module.exports = router;