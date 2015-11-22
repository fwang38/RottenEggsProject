var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var result=[];
var resultperson=[];
function keywordMovie(req, res){
	var movie=req.query.movie;
	console.log(req.query.movie);
	console.log('aa');
	//console.log(genre);
		var connection = mysql.createConnection({
		  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		  user     : 'boliu',
		  password : 'liubo1678',
		  database : 'RottenEggs'
		});
		
		var q='SELECT * from movie m where m.title LIKE \'%'+ movie+'%\' limit 25';
		var q2='SELECT * from personinfo p where p.name LIKE \'%'+ movie+'%\' limit 25';
		console.log(q);
		console.log(q2);
		connection.connect();
		
		connection.query(q , function(err, rows, fields) {
		  if (!err){
			  //console.log('The solution is: ', rows);
			  
			  for (var i in rows) {
			        result.push(rows[i]);
			   }
			  //console.log(result);
			  
		  } 
		  else
		    console.log('Error while performing Query.');
		});
		//console.log(result);
		connection.query(q2 , function(err, rows, fields) {
			  if (!err){
				  //console.log('The solution is: ', rows);
				  
				  for (var i in rows) {
				        resultperson.push(rows[i]);
				   }
				  console.log(resultperson);
			  } 
			  else
			    console.log('Error while performing Query.');
			});
		//console.log(result);
		res.render('index',{results:null, resultsmovie:result, resultsperson:resultperson, user:req.user});
		connection.end();
}
//
exports.displayResponse = function(req, res){
	keywordMovie(req, res);
};