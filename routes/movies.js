
var mysql      = require('mysql');

var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();


function getResults(movie_id, db, callback) {
	console.log("MOVIE ID" + movie_id);
	var cursor =db.collection('movie_reviews').find({ '_id': parseInt(movie_id)});
	var commentresult = [];
	cursor.each(function(err, doc) {
		console.log("DOC"+ doc + doc != null);
		if (doc != null){
		if (doc.reviews != null) {
			
			for (i=0; i<doc.reviews.length; i++){
				commentresult.push(doc.reviews[i]);
			}
			//console.log(commentresult)
		} }else {
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
	var results_person = [];
	var connection = mysql.createConnection({
	  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
	  user     : 'boliu',
	  password : 'liubo1678',
	  database : 'RottenEggs',
	  multipleStatements: true  
	});

	connection.connect();
	var q1 = "SELECT m.movie_id, mt.url, m.title, m.revenue, m.overview, m.poster, m.releasedate, m.runtime, m.vote, m.userrating, 10-((10*vote/(select MAX(vote) from movie))+(10-userrating))/2 AS rottenrating from movie m LEFT JOIN movie_trailer mt ON mt.movie_id = m.movie_id WHERE m.movie_id =" + movie_id +";";
	var q2= "SELECT p.personid, p.name, mc.characters FROM personinfo p INNER JOIN movie_cast mc ON p.personid = mc.personid WHERE mc.movie_id =" + movie_id + " ORDER BY mc.orders LIMIT 5;";
	if (req.user != null) {
		var q3='SELECT movie_id from votes v, movie m where v.userid =\''+ req.user.id +'\' and v.movieid=m.movie_id'
	}
	else {
		var q3 = '';
	}
	var q = q1 + q2+ q3;
	console.log(q);
	connection.query(q, function(err, rows, fields) {
	  if (!err){
	    console.log('The solution is: ', rows);
	    //results = rows.slice();
	    results = rows[0];
	    results_person = rows[1];
	    var hi=rows[2];
	      var hasvoted = [];
	      if (hi != null) {
	    	  for (var i in hi){
	    		  hasvoted.push(hi[i].movie_id);
	    	  }
	      }
	    generateResponse2(movie_id, req, res, function(commentresult) {
			//db.close();
			//results = commentresult;
			//console.log(results);
			//res.render('movies.ejs', {results: results});
	    	console.log(results)
	    	console.log(commentresult)
			res.render('movies.ejs', {results: results, hasvoted:hasvoted, results_person: results_person, commentresult: commentresult, user:req.user});
		});
	   	}
	  
	  else
	    console.log('Error while performing Query.');
	});
	
	
};


exports.displayResponse = function(req, res){
	generateResponse(req, res);
	
};

