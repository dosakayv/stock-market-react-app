var Stock = require("../models/stock");
var mongoose = require("mongoose");

var stocks = [
	new Stock({
		name: "stock 1",
		description: "stock 1 description"
	}),
	new Stock({
		name: "stock 2",
		description: "stock 2 description"
	}),
	new Stock({
		name: "stock 3",
		description: "stock 3 description"
	})
];

mongoose.connect("mongodb://cucumberv:cucumberv@ds023654.mlab.com:23654/stocks-graph");

var done = 0;
stocks.some(function(stock){
	stock.save(function(err, result) {
		done++;
		if (done === stocks.length) {
			exit();
			return true;
		}
		return false;
	});
})

function exit() {
	mongoose.disconnect();
}