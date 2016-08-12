var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var getRouterRestaurants = require('./routes/restaurants');

var app = express();

// Connection URL
var url = 'mongodb://localhost:27017/test';


// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {

	if (err) throw err;

	app.use('/restaurants', getRouterRestaurants(db) )

	app.listen(3000, function() {
		console.log ("listening to port 3000");
	})

})