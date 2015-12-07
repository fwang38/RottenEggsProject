var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
	var connection = mysql.createConnection({
		  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		  user     : 'boliu',
		  password : 'liubo1678',
		  database : 'RottenEggs',
		  multipleStatements: true
		});
		var q1='select * from movie order by releasedate desc limit 12';
		var q2='SELECT * from votes v, movie m where v.userid =\''+ req.user.id +'\' and v.movieid=m.movie_id' ;
		console.log(q1+q2);
		connection.connect();
		connection.query(q1+q2 , function(err, rows, fields) {
		if (!err){
			  console.log('The solution is: ', rows);
			  var result=[];
			  var resultvote=[];
			  result=rows[0];
		      resultvote=rows[1];
			  console.log(result);
			  res.render('index',{bing: null, results:result, resultsvote:resultvote, resultsperson:null, resultsmovie:null, user:req.user});
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