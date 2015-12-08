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
		  database : 'RottenEggs',
		  multipleStatements: true
		});
		var q1='SELECT * from movie m, movie_genre mg where m.movie_id=mg.id and mg.genre = \''+ genre+'\' limit 15;';
		if (req.user != null) {
			var q4='SELECT movie_id from votes v, movie m where v.userid =\''+ req.user.id +'\' and v.movieid=m.movie_id'
		}
		else {
			var q4 = '';
		}
		var q=q1+q4;
		console.log(q);
		connection.connect();
		connection.query(q , function(err, rows, fields) {
		  if (!err){
			  console.log('The solution is: ', rows);
			  
			  if(req.user==null){
					var result=rows;
					var hi=null;
				}else{
					var result=rows[0];
					var hi=rows[1];
				}
			      var hasvoted = [];
			      if (hi != null) {
			    	  for (var i in hi){
			    		  hasvoted.push(hi[i].movie_id);
			    	  }
			      }
			 
			  console.log(result);
			    res.render('index',{results:result, bing:null, limitnum:12,hasvoted:hasvoted, recentvote:null, currentworst:null, resultsperson:null, resultsmovie:null, user:req.user});
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