var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

// Connection URL
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {


	if (err) throw new Error("something failed in the connection");

	app.get('/restaurants', function(req,res) {

		var cursor;
		var queries = filterQuery(req);
		var results = limitResults (req);
		var pageToSkip = skipPages (req);

		if(req.query) {

			cursor = db.collection('restaurants').find({}, queries).limit(results).skip(pageToSkip);

		} else {

			cursor = db.collection('restaurants').find({}).limit(results).skip(pageToSkip);	
		}


		cursor.toArray(function(err, docs) {
			res.json(docs);
		});

	})


	app.get('/restaurants/borough/:borough', function(req,res) {
		console.log(req.params.borough);

		var myBorough = req.params.borough;
		var queries = filterQuery(req);
		var results = limitResults (req);
		var pageToSkip = skipPages (req);

		console.log("from boroguh!!")
		var cursor;

		cursor = db.collection('restaurants').find( {borough: myBorough}, queries).limit(results).skip(pageToSkip);

		cursor.toArray(function(err, docs) {
			res.json(docs);
		});
	})


	var cuisinePath = ['restaurants/cuisine/:cuisine', '/restaurants/cuisine/not/:cuisine'];
	app.get( cuisinePath, function(req,res) {

		var myCuisine = req.params.cuisine;

		var path = req.path.split('/');
		if (path[3] ==='not') {
			myCuisine = {$ne : myCuisine};
			}

		var queries = filterQuery(req);
		var results = limitResults (req);
		var pageToSkip = skipPages (req);

		console.log("from path!!")
		var cursor;

		cursor = db.collection('restaurants').find( {cuisine: myCuisine}, queries).limit(results).skip(pageToSkip);

		cursor.toArray(function(err, docs) {
			res.json(docs);
		});
	})



	app.listen(3000, function() {
		console.log ("listening to port 3000");
	})

});


function filterQuery (req) {
	var projection = {};
	var toShow;
	var toHide;
	if (req.query.show) {
		toShow = req.query.show.split(",");
		toShow.forEach(function (propProjection, i) {
			projection[propProjection] = 1;
		})
	};

	if (req.query.hide) {
		toHide = req.query.hide.split(",");
		toHide.forEach(function (propToHideProjection, i) {
			projection[propToHideProjection] = 0;
		})
	};

	return projection;
};

function limitResults (req) {

	var numberResults = parseInt(req.query.limit);
	return numberResults;

}

function skipPages (req) {
	var page = parseInt(req.query.skip)
	return page;
}


//restaurants/cuisine/:cuisine & /restaurants/cuisine/not/:cuisine
//http://localhost:3000/restaurants/cuisine/Bakery?hide=_id&show=name,cuisine&limit=3
//http://localhost:3000/restaurants/cuisine/not/Bakery?hide=_id&show=name,cuisine&limit=3



