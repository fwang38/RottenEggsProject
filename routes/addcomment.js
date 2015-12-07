



function generateResponse(req, res){	
	//lets require/import the mongodb native drivers.
	var mongodb = require('mongodb');

	//We need to work with "MongoClient" interface in order to connect to a mongodb server.
	var MongoClient = mongodb.MongoClient;

	// Connection URL. This is where your mongodb server is running.
	var url = 'mongodb://liubo1678:liubo1678@ds057234.mongolab.com:57234/rotteneggs';

	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		if(err != null) {
			console.log("Connection to server failed.");
			db.close();
			res.render('error', {
				message: "Connection to server failed.",
				error: err
			});
		}
		// If there is no error while connecting, proceed further
		else {
	    //HURRAY!! We are connected. :)
	    console.log('Connection established to', url);
	    
	    var movie_id_for_comment = req.query.movieid; 
	    console.log(movie_id_for_comment);

	    db.collection("movie_reviews").update(
				  {_id: parseInt(movie_id_for_comment)},
				  {
				    "$push" : {
				      reviews : {
				        userid: req.user._id, 
				        review: req.query.comments
				      }
				    }
				  }
				);

	    //Close connection
	    db.close();
	  }
	});	
}	
	
	
	



exports.displayResponse = function(req, res){
	generateResponse(req, res);
	console.log("huiehaduiablfhcuascishau")
	console.log(req.query)
	console.log(req.user._id)
	res.redirect('/linktomovie?movieid='+req.query.movieid);
};

