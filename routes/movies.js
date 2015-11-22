
var mysql      = require('mysql');
var movie_id   = 12;

function generateResponse(req, res) {
//	generateResponse(req, res);
	var results = [];
	var connection = mysql.createConnection({
	  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
	  user     : 'boliu',
	  password : 'liubo1678',
	  database : 'RottenEggs'
	});

	connection.connect();
	
	connection.query("SELECT * from movie m INNER JOIN movie_trailer mt ON mt.movie_id = m.movie_id WHERE m.movie_id = 13", function(err, rows, fields) {
	  if (!err){
	    console.log('The solution is: ', rows);
	    results = rows.slice();
	    res.render('movies.ejs', {results: results});
	    console.log(results)
	    //callback(results);
	   	}
	  else
	    console.log('Error while performing Query.');
	});
	
	
};


exports.displayResponse = function(req, res){
	generateResponse(req, res);
};

