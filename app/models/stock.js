var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name:  String,
	description: String
});

schema.statics.getAllStocks = function(callback) {
	Stock.find(function(err, docs){
		if (!err) {
			callback(docs);
		}
	});
};

schema.statics.saveStock = function(name, description, callback) {
	var stock = new Stock({
		name: name,
		description: description
	});

	stock.save(function(err, response){
		if (!err) {
			callback(response);
		}
	});
};


module.exports = Stock = mongoose.model('Stock', schema);
