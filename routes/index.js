var express = require('express');
var router = express.Router();
var mysql = require('mysql');

function generateResponse(req, res) {
	// The url to connect to the mongodb instance
	var connection = mysql.createConnection({
		  host     : 'mydb.c31kdvhm3rfj.us-west-2.rds.amazonaws.com',
		  user     : 'boliu',
		  password : 'liubo1678',
		  database : 'RottenEggs'
		});

		connection.connect();

		connection.query('SELECT genre from genre', function(err, rows, fields) {
		  if (!err){
			  console.log('The solution is: ', rows);
			  var result=[];
			  for (var i in rows) {
			        result.push(rows[i].genre);
			   }
			    res.render('index',{results:null, genres:result});
		  } 
		  else
		    console.log('Error while performing Query.');
		});
		connection.end();
}
function getmovies(req, db, callback){

}
/* GET home page. */
router.get('/', function(req, res, next) {
  generateResponse(req, res);
});

router.get('/homepage', function(req, res, next) {
	
	res.render('homepage', {results: null});
});

router.get('/comment', function(req, res, next) {
	res.render('comment', {results: null});
});


module.exports = router;

//module.exports = function(app, passport){
//	 
//	app.get('/login', function(req, res) {
//		// Display the Login page with any flash message, if any
//	    res.render('login.ejs', { message: req.flash('message') });
//	});
//	
//	app.post('/login', passport.authenticate('login', {
//		successRedirect: '/index',
//	    failureRedirect: '/login',
//	    failureFlash : true 
//	}));
//	 
//	app.get('/signup', function(req, res){
//		res.render('signup.ejs',{message: req.flash('message')});
//	});
//	
//	app.post('/signup', passport.authenticate('signup', {
//	    successRedirect: '/index',
//	    failureRedirect: '/signup',
//	    failureFlash : true 
//	}));
//	 
//	app.get('/logout', function(req, res) {
//        req.logout();
//        res.redirect('/');
//    })
	
//	// we will want this protected so you have to be logged in to visit
//    // we will use route middleware to verify this (the isLoggedIn function)
//    app.get('/profile', isLoggedIn, function(req, res) {
//        res.render('profile.ejs', {
//            user : req.user // get the user out of session and pass to template
//        });
//    });
    
//}

////route middleware to make sure a user is logged in
//function isLoggedIn(req, res, next) {
//
//    // if user is authenticated in the session, carry on 
//    if (req.isAuthenticated())
//        return next();
//
//    // if they aren't redirect them to the home page
//    res.redirect('/');
//}