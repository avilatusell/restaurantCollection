var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

// Connection URL
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {

	if (err) throw new Error("something failed in the connection");

	app.get('/restaurants', function(req,res) {

		var toShow; 
		var toHide;
		var projection = {};
		var cursor;

		if(req.query) {
			if (req.query.show) {  //ya te da los valores que contiene el objeto show
				console.log(req.query.show);
				toShow = req.query.show.split(",")
				toShow.forEach(function( propProjection,i) {
					projection[propProjection] = 1;
				})
			}


			if (req.query.hide) {   //ya te da los valores que contiene el objeto hide
				console.log(req.query.hide);
				toHide = req.query.hide.split(",")
				toHide.forEach(function( propToHideProjection,i) { //
					projection[propToHideProjection] = 0;
				})
				//cursor = db.collection('restaurants').find({}, projection);
			}

			cursor = db.collection('restaurants').find({}, projection);



		} else {
			cursor = db.collection('restaurants').find({});	
		}


		cursor.toArray(function(err, docs) {
			res.json(docs);
		});
		console.log(projection);
	})

	app.listen(3000, function() {
		console.log ("listening to port 3000");
	})

});


/*results of console log 

1) listening to port 3000
2) name,cuisine
3) _id
4) { name: 1, cuisine: 1, _id: 0 }


/* equivalent for Each 
var projection = {}
var fields = ["name","_id"]
var numElements = fields.length;

for (var i=0; i<numElements; i++) {
  var currentElement = fields[i];
  projection[currentElement] = 1
}
console.log(projection)
=> Object {name: 1, _id: 1}

*/