var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../routes/user.js');
var flash = require('connect-flash');

//module.exports = router;
module.exports = function(passport) {
	
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) {

        
        process.nextTick(function() {

        
        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
//            	console.log("That username is already taken.");
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
            	console.log("hi");
            	
                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.local.username = username;
//                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

};


