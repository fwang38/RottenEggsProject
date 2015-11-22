var mysql = require('mysql');

function getResults(req, res, connection, callback) {
	connection.query('SELECT * from personinfo limit 5', function(err, rows, fields) {
		if (!err){
			console.log('The solution is: ', rows);
			callback(rows);			
		}
		else{
			console.log('Error while performing Query.');
			console.log('The solution is: ', rows);
			res.render('error', {
				message: "Error while performing Query.",
				error: err
			});			
		}
	});
};

function generateResponse(req, res) {
	var connection = mysql.createConnection({
		host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		user     : 'boliu',
		password : 'liubo1678',
		database : 'RottenEggs'
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

	getResults(req, res, connection, function(results) {
		//res.render('homepage.ejs', {results: results});
	});

	connection.end();
}


exports.displayResponse = function(req, res){
	generateResponse(req, res);
};