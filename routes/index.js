var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
	var connection = mysql.createConnection({
		  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		  user     : 'boliu',
		  password : 'liubo1678',
		  database : 'RottenEggs'
		});
		var q='select * from movie order by releasedate desc limit 12';
		console.log(q);
		connection.connect();
		connection.query(q , function(err, rows, fields) {
		if (!err){
			  console.log('The solution is: ', rows);
			  var result=[];
			  for (var i in rows) {
			        result.push(rows[i]);
			  }
			  console.log(result);
			  res.render('index',{results:result, resultsperson:null, resultsmovie:null, user:req.user});
		} 
		else
		    console.log('Error while performing Query.');
		});
		connection.end();
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