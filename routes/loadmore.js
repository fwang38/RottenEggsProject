var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var Bing = require('node-bing-api')({ accKey: "OTpuAnHgxrv5ldRgN/0hOKU3g++cfJyJF8rX7PdK+RQ" });
//var result=[];
//var resultperson=[];
function generateResponse(req, res) {
	var limitnum=req.query.limitnum;
	var connection = mysql.createConnection({
		host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		user     : 'boliu',
		password : 'liubo1678',
		database : 'RottenEggs',
		multipleStatements: true
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
	var lim=(parseInt(limitnum)+parseInt(12));
	var q1='select * from movie order by releasedate desc limit '+lim+';';
	if (req.user != null) {
		var q4='SELECT movie_id from votes v, movie m where v.userid =\''+ req.user.id +'\' and v.movieid=m.movie_id'
	}
	else {
		var q4 = '';
	}
	var q=q1+q4;
	
	console.log(q);
	connection.query(q , function(err, rows, fields) {
	if (!err){
		  console.log('The solution is: ');	
		  	console.log("aaaaaa");
			console.log(rows[0]);
			console.log("bbbbbbbb");
			console.log(rows[1]);
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
		  console.log(rows);
		  console.log(req.user==null);
		  
		  res.render('index',{bing: null, results:result, limitnum:lim, hasvoted: hasvoted, recentvote: null, currentworst:null, resultsperson:null, resultsmovie:null, user:req.user});
	} 
	else
	    console.log('Error while performing Query.');
	});
	connection.end();
}


exports.displayResponse = function(req, res){
	console.log("aaaaaaaaaaa");
	console.log(req.query);
	console.log("cccccccccccccc");
	generateResponse(req, res);
};