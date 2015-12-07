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
	var q='select * from movie order by releasedate desc limit '+lim;
	console.log(q);
	connection.query(q , function(err, rows, fields) {
	if (!err){
		  console.log('The solution is: ');
		  var result=rows;
		  console.log(rows);
		  res.render('index',{bing: null, results:result, limitnum:lim, recentvote: null, currentworst:null, resultsperson:null, resultsmovie:null, user:req.user});
	} 
	else
	    console.log('Error while performing Query.');
	});
	connection.end();
}


exports.displayResponse = function(req, res){
	generateResponse(req, res);
};