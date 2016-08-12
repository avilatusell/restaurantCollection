function filterProjection (req, res, next) {

		var projection = {};
		var aShow, aHide;

		if (req.query && req.query.show) {
			aShow = req.query.show.split(",")
			projection = aShow.reduce( function(acc, item, i ) {
				acc[item] = 1;
				return acc;
			}, projection)
		}

		if (req.query && req.query.hide) {
			aHide = req.query.hide.split(",")
			projection = aHide.reduce( function(acc, item, i ) {
				acc[item] = 0;
				return acc;
			}, projection)
		}

		req.projection = projection;

		next();

	}

module.exports = filterProjection;