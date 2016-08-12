var express = require('express');
var router = express.Router();

var filterProjection = require('./middlewares/filterProjection');

var getAll = require('./handlers/getAll');
var byBorough = require('./handlers/byBorough');

function getRouter(db) {

	router.use ( filterProjection )

	router.get('/', function(req,res) {
		getAll(db, req, res)
	})

	router.get('/borough/:borough', function(req,res) {
		byBorough(db, req, res)
	})

	//router.get('/', getAll.bind(null, db) )


	return router;

}

module.exports = getRouter;