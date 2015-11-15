var express = require('express');
var router = express.Router();
var mysql = require('mysql');

function generateResponse(req, res) {
	// The url to connect to the mongodb instance
	var connection = mysql.createConnection({
		  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		  user     : 'boliu',
		  password : 'liubo1678',
		  database : 'RottenEggs'
		});

		connection.connect();

		connection.query('SELECT genre from genre', function(err, rows, fields) {
		  if (!err){
			  console.log('The solution is: ', rows);
			  var result=[];
			  for (var i in rows) {
			        result.push(rows[i].genre);
			   }
			    res.render('index',{results:null, genres:result});
		  } 
		  else
		    console.log('Error while performing Query.');
		});
		connection.end();
}
function getmovies(req, db, callback){

}
/* GET home page. */
router.get('/', function(req, res, next) {
  generateResponse(req, res);
});

router.get('/homepage', function(req, res, next) {
	
	res.render('homepage', {results: null});
});

router.get('/comment', function(req, res, next) {
	res.render('comment', {results: null});
});

module.exports = router;