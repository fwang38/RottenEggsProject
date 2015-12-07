var express = require('express');
var router = express.Router();
var mysql = require('mysql');

function generateResponse(req, res) {
	var connection = mysql.createConnection({
		host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		user     : 'boliu',
		password : 'liubo1678',
		database : 'RottenEggs',
		multipleStatements: true
	});

	connection.connect(function(err){
		if (!err){
			console.log("Connected correctly to server.");			
		}
		else{
			console.log("Connection to server failed.");
			res.render('error', {
				message: "Connection to server failed.",
				error: err
			});			
		}
	});
	
	var q1='select * from movie order by releasedate desc limit 12;';
	var q2='select * from votes order by ts desc limit 10;';
	var q3='select * from movie order by vote desc limit 10;';
	var q=q1+q2+q3;
	console.log(q);
	connection.query(q , function(err, rows, fields) {
	if (!err){
		  console.log('The solution is: ');
		  var result=rows[0];
	      var recentvote=rows[1];
	      var currentworst=rows[2];
		  console.log(recentvote);
		  console.log(currentworst);
		  res.render('index',{bing: null, results:result, recentvote: recentvote, currentworst:currentworst, resultsperson:null, resultsmovie:null, user:req.user});
	} 
	else
	    console.log('Error while performing Query.');
	});
	connection.end();
}

/* GET home page. */
router.get('/', function(req, res, next) {
	generateResponse(req, res);		
});


router.get('/comment', function(req, res, next) {
	res.render('comment', {results: null});
});

module.exports = router;