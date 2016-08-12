function getAll(db, req, res) {

		db.collection('restaurants').find({}, req.projection)
			.limit(10)
			.toArray(function(err , restaurants) {
				res.json(restaurants);
			})

}

module.exports = getAll;