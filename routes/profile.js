var express = require('express');
var router = express.Router();
var mysql = require('mysql');

function getUserVote(req,res){
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
		var q='SELECT * from votes v, movie m where v.userid =\''+ req.user.id +'\' and v.movieid=m.movie_id' ;
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
			  res.render('profile',{results:result, user:req.user});
		  } 
		  else
		    console.log('Error while performing Query.');
		});
		connection.end();
}


exports.displayResponse = function(req, res){
	getUserVote(req, res);
};