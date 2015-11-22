
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

//router.get('/movies', function(req, res, next) {
	//res.render('movies', {results: null});
	//movies.displayResponse;
//});

router.get('/homepage', function(req, res, next) {
	res.render('homepage', {results: null});
});



module.exports = router;
//
//exports.displayResponse = function(req, res){
//
//	var connection = mysql.createConnection({
//	  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
//	  user     : 'boliu',
//	  password : 'liubo1678',
//	  database : 'RottenEggs'
//	});
//
//	connection.connect();
//
//	connection.query('SELECT * from personinfo', function(err, rows, fields) {
//	  if (!err)
//	    console.log('The solution is: ', rows);
//	  else
//	    console.log('Error while performing Query.');
//	});
//
//	connection.end();
//};
