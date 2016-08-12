var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

// Connection URL
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {

	if (err) throw new Error("something failed in the connection");

//Find the first document
	// app.get('/restaurants1', function(req,res) {
	// 	//console.log("Connected correctly to server");
	// 	findFirstDocuments(db, function( data ) {
	// 			res.json(data);
	// 	//db.close();
	// 	});
	// })

//Find the restaurants
	// app.get('/restaurants', function(req,res) {
	// 	console.log("Connected correctly to server");
	// 	findDocuments(db, function( data ) {
	// 			res.json(data);
	// 	db.close();
	// 	});
	// })

//Find the restaurants with query restaurants?show=_id,name,borough,cuisine
	app.get('/restaurants', function(req,res) {


		console.log(req.query);
		findQueries(db, function( data ) {


				res.json(data);

				
		//db.close();
		});
	})




	app.listen(3000, function() {
		//console.log ("listening to port 3000");
	})
});

/*---------------------1----------------------*/
function findFirstDocuments(db, callback) {

	var collection = db.collection('restaurants');

	// Find some documents
	collection.find().limit(1).toArray(function(err, docs) {
		//console.log("Found the following records");
		//console.dir(docs);
		callback(docs);
	});
};

/*---------------------2----------------------*/
function findDocuments(db, callback) {

	var collection = db.collection('restaurants');

	// Find some documents
	collection.find().toArray(function(err, docs) {
		console.log("Found the following records");
		console.dir(docs);
		callback(docs);
	});
};

/*---------------------3----------------------*/
// query: restaurants?show=_id,name,borough,cuisine. The query is: _id,name,borough,cuisine
function findQueries(db, callback) {

//{ show: '_id,name,borough,cuisine' } this is req.query

var myFilterQuery = {

};

	var myQuery =db.query.show
	// console.log(myQuery);

	// if (myQuery.length = 0) {
	// 	console.log("there is no request");
	// } else {
	// 	console.log("there is something");
	// }

	var collection = db.collection('restaurants');

	collection.find(
		{},
		{ _id: 1, adress: 0, borough: 1, cuisine: 1}
			).toArray(function(err, docs) {
				console.log("hello from queries");
				console.dir(docs);
				callback(docs);
			});
};



