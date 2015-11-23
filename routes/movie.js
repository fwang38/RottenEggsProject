var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//var result=[];
//var resultperson=[];

function doquery(q){
	var q='SELECT * from movie m where m.title LIKE \'%'+ movie+'%\' limit 5';
	var result=[];
	
	var connection = mysql.createConnection({
		  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		  user     : 'boliu',
		  password : 'liubo1678',
		  database : 'RottenEggs'
		});
	connection.connect();
	
	connection.query(q , function(err, rows, fields) {
	  	if (!err){
		  	for (var i in rows) {
		        result.push(rows[i]);
		   	}
		  	console.log("result!!!!!");
		  	console.log(result);
		  	return result;
		} 
	  	else console.log('Error while performing Query.');
	});
	
	connection.end();
}

function keywordMovie(req, res, callback){
	
	
	var movie=req.query.movie;
	console.log(req.query.movie);
	
	//console.log(doquery(q));
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	var x = 	
	var x1= 
	callback(x,x1);
	
}
//
exports.displayResponse = function(req, res){
	keywordMovie(req, res, function(resultsmovie, resultsperson){
		console.log(resultsmovie);
		console.log(resultsperson);
		res.render('index',{results:null, resultsmovie:resultsmovie, resultsperson:resultsperson, user:req.user});
	});
};