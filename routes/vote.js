var mysql = require('mysql');

function getResults(req, res, connection, callback) {
	console.log(req.user._id);
	connection.query("INSERT INTO votes (movieid,userid) VALUES(" + "2" + "," + "'" + req.user._id + "'" +")", function(err, rows, fields) {
		if (!err){
			console.log('The solution is: ', rows);
			callback(rows);			
		}
		else{
			console.log('Vote Failed!');
			res.render('error', {
				message: 'Vote Failed!',
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