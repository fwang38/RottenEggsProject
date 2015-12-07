
var mysql      = require('mysql');

var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();


function getResults(movie_id, db, callback) {
	var cursor =db.collection('movie_reviews').find({ '_id': parseInt(movie_id)});
	var commentresult = [];
	cursor.each(function(err, doc) {
		if (doc != null) {
			console.log(doc.reviews[0])
			
			for (i=0; i<doc.reviews.length; i++){
				commentresult.push(doc.reviews[i]);
			}
			//console.log(commentresult)
		} else {
			console.log(commentresult);
			callback(commentresult);
			//console.log(commentresult)
		}
	});

};

function generateResponse2(movie_id, req, res, callback) {
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
			getResults(movie_id, db, function(commentresult) {
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
	var movie_id=req.query.movieid;
	console.log(req.query);
	console.log(movie_id);
	console.log('aa');
//	generateResponse(req, res);
	var results = [];
	var connection = mysql.createConnection({
	  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
	  user     : 'boliu',
	  password : 'liubo1678',
	  database : 'RottenEggs'
	});

	connection.connect();
	var q = "SELECT m.movie_id, mt.url, m.title, m.revenue, m.overview, m.poster, m.releasedate, m.runtime, m.vote from movie m LEFT JOIN movie_trailer mt ON mt.movie_id = m.movie_id WHERE m.movie_id =" + movie_id;
	console.log(q);
	connection.query(q, function(err, rows, fields) {
	  if (!err){
	    console.log('The solution is: ', rows);
	    results = rows.slice();
	    
	    generateResponse2(movie_id, req, res, function(commentresult) {
			//db.close();
			//results = commentresult;
			//console.log(results);
			//res.render('movies.ejs', {results: results});
	    	console.log(results)
	    	console.log(commentresult)
			res.render('movies.ejs', {results: results, commentresult: commentresult, user:req.user});
		});
	   	}
	  
	  else
	    console.log('Error while performing Query.');
	});
	
	
};


exports.displayResponse = function(req, res){
	generateResponse(req, res);
	
};

