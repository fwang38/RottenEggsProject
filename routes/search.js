var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var Bing = require('node-bing-api')({ accKey: "OTpuAnHgxrv5ldRgN/0hOKU3g++cfJyJF8rX7PdK+RQ" });
//var result=[];
//var resultperson=[];
function doquery(q,q2,callback){
	var result=[];
	var resultsperson=[];
	var connection = mysql.createConnection({
		  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		  user     : 'boliu',
		  password : 'liubo1678',
		  database : 'RottenEggs',
		  multipleStatements: true
		});
	connection.connect();
	
	connection.query(q+';'+q2, function(err, rows, fields) {
		console.log(q+';'+q2);
	  	if (!err){
		        result=rows[0];
		        resultsperson=rows[1];
		        callback(result,resultsperson);
		  	console.log("aaa!!!!!");
		}  	
	  	else console.log('Error while performing Query.');
	});
	
	connection.end();
}

function keywordMovie(req, res){
	
	var movie=req.query.movie;
	console.log(req.query.movie);
	
	var q='SELECT * from movie m where m.title LIKE \'%'+ movie+'%\' limit 10';
	var q2='SELECT * from personinfo p where p.name LIKE \'%'+ movie+'%\' limit 10';

	doquery(q,q2,function(resultsmovie,resultsperson){
		Bing.news(movie, {
		    top: 10,  // Number of results (max 15) 
		    skip: 0,   // Skip first 3 results 
		    newsSortBy: "Date", //Choices are: Date, Relevance 
		    newsCategory: "rt_Entertainment"
		  }, function(error, results, body){
		    console.log(body.d.results);		
		    console.log("result!!!!!!");
		    console.log(resultsmovie);
		    console.log(resultsperson);
			res.render('index',{results:null,limitnum:12, bing:body.d.results,  recentvote:null, currentworst:null,resultsmovie:resultsmovie, resultsperson:resultsperson, user:req.user});
		});
		
		
	});
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

}
//


exports.displayResponse = function(req, res){
	keywordMovie(req, res);
};