var express = require('express');
var router = express.Router();
var mysql = require('mysql');


function generateBadmovies(req,res){
	var genre=req.query.g;
	console.log(req.query.g);
	console.log('aa');
	//console.log(genre);
	var connection = mysql.createConnection({
		  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		  user     : 'boliu',
		  password : 'liubo1678',
		  database : 'RottenEggs'
		});
		var q='SELECT * from movie m, movie_genre mg where m.movie_id=mg.id and mg.genre = \''+ genre+'\' limit 15';
		console.log(q);
		connection.connect();
		connection.query(q , function(err, rows, fields) {
		  if (!err){
			  console.log('The solution is: ', rows);
			  var result=[];
			  for (var i in rows) {
			        result.push(rows[i]);
			   }
			  console.log(result);
			    res.render('index',{results:result, resultsperson:null, resultsmovie:null, user:req.user});
		  } 
		  else
		    console.log('Error while performing Query.');
		});
		connection.end();
}

function linktomovie(req,res){
	var genre=req.query.g;
	console.log(req.query.g);
	console.log('aa');
}


exports.displayResponse = function(req, res){
	generateBadmovies(req, res);
};