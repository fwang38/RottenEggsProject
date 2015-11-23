
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = function(app, passport){
	 

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user 
		});
	});
	
	app.get('/login', function(req, res) {
		// Display the Login page with any flash message, if any
	    res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	
	app.post('/login', passport.authenticate('login', {
		successRedirect: '/profile',
	    failureRedirect: '/login',
	    failureFlash : true 
	}));
	
	app.get('/signup', function(req, res){
		res.render('signup.ejs',{message: req.flash('signupMessage')});
	});
	

	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash : true 
	}));
	
//	app.get('/auth/facebook',
//			  passport.authenticate('facebook', { scope: ['user_status', 'user_checkins'] }));
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	app.get('/auth/facebook/callback',
			  passport.authenticate('facebook', { failureRedirect: '/login' }),
			  function(req, res) {
			    // Successful authentication, redirect home.
			    res.redirect('/profile');
			  });
    // handle the callback after facebook has authenticated the user
//    app.get('/auth/facebook/callback',
//        passport.authenticate('facebook', {
//            successRedirect : '/profile',
//            failureRedirect : '/'
//        }));
	
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	})
} 