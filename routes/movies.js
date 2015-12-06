
var mysql      = require('mysql');
var movie_id   = 110;
var movie_id_for_comment = 843; 
var MongoClient = require('mongodb').MongoClient;


function getResults(db, callback) {
	var cursor =db.collection('movie_reviews').find({ '_id': movie_id_for_comment });
	var commentresult = [];
	cursor.each(function(err, doc) {
		if (doc != null) {
			//console.log(doc.reviews[0])
			
			for (i=0; i<doc.reviews.length; i++){
				commentresult.push(doc.reviews[i]);
			}
			//console.log(commentresult)
		} else {
			callback(commentresult);
			//console.log(commentresult)
		}
	});
};

function generateResponse2(req, res, callback) {
	// The url to connect to the mongodb instance
	var results=[];
	var mongoUrl = 'mongodb://liubo1678:liubo1678@ds057234.mongolab.com:57234/rotteneggs';
	MongoClient.connect(mongoUrl, function(err, db) {
		// If there is an error, log the error and render the error page 
		if(err != null) {
			console.log("Connection to server failed.");
			db.close();
			res.render('error', {
				message: "Connection to server failed.",
				error: err
			});
		}
		// If there is no error while connecting, proceed further
		else {
			console.log("Connected correctly to server MONGODB.");
			getResults(db, function(commentresult) {
				db.close();
				results = commentresult;
				callback(results);
				//console.log(results);
				//res.render('movies.ejs', {results: results});
			});
			//console.log(commentresult)
			
		}
	});
}



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
	var q = "SELECT * from movie m INNER JOIN movie_trailer mt ON mt.movie_id = m.movie_id WHERE m.movie_id =" + movie_id;
	console.log(q);
	connection.query(q, function(err, rows, fields) {
	
	  if (!err){
	    console.log('The solution is: ', rows);
	    results = rows.slice();
	    
	    generateResponse2(req, res, function(commentresult) {
			//db.close();
			//results = commentresult;
			//console.log(results);
			//res.render('movies.ejs', {results: results});
	    	console.log(results)
	    	console.log(commentresult)
			res.render('movies.ejs', {results: results, commentresult: commentresult, user:req.user});
		});
	    
	    //console.log(commentresult)
	    
	    //console.log(results)
	    
	   	}
	  else
	    console.log('Error while performing Query.');
	});
	
	
};


exports.displayResponse = function(req, res){
	generateResponse(req, res);
	
};

