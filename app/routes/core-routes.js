var React = require("react");
var ReactDOM = require("react-dom/server");
var StockModels = require('../models/stock');
var Request = require('request');

var ReactApp = React.createFactory(require('../components/layout.js'));

var routes = function(app) {
	app.use(function(req, res, next) {
	    GLOBAL.navigator = {
	        userAgent: req.headers['user-agent']
	    }
	    next();
	});
	app.get('/', function(req, res){
		// vishnu this works great!
		// StockModels.find(function(err, docs){
		// 	var stocks = {
		// 		stockList: []
		// 	};
		// 	docs.forEach(function(stock){
		// 		stocks.stockList.push(stock.name);
		// 	});
		// 	var stocksJSONString = JSON.stringify(stocks);
			
		// 	var reactHtml = ReactDOM.renderToString(ReactApp({stocks: stocks.stockList}));
		// 	res.render('index.ejs', {reactOutput: reactHtml, initialStocksData: stocksJSONString});
		// });
		// vishnu this works great!
		var stockDataRetrieved = function(docs) {
			var stocks = {
				stockList: []
			};
			console.log("VISHNU 3284902834 Remove: ", docs);
			if (docs.length > 0) {
				docs.forEach(function(stock){
					stocks.stockList.push(stock.name);
				});			
				getAllStocksData(stocks);
			}
			else {
				var stocksJSONString = JSON.stringify({
					stocks: [],
					stocksData: []
				});

				var reactHtml = ReactDOM.renderToString(ReactApp({stocks: [], stocksData: []}));
				res.render('index.ejs', {reactOutput: reactHtml, initialStocksData: stocksJSONString});
			}
		}

		var getStartAndEndDates = function() {
			var dates = {
				startDate: "",
				endDate: ""
			};

			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 

			dates.startDate = (yyyy - 1) + '-' + mm + '-' + dd;
			dates.endDate = yyyy + '-' + mm +'-'+ dd;

			return dates;
		};

		var getAllStocksData = function(stocks){

			console.log("stocks in database: ", stocks);

			var url = 'https://query.yahooapis.com/v1/public/yql';
			var dates = getStartAndEndDates();
			var startDate = dates.startDate;
			var endDate = dates.endDate;

			var testStocks = stocks.stockList;
			var testStocksDataRecieved = 0;
			var testStocksData = [];

			testStocks.forEach(function(stock){
				var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("' + stock + '") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
				Request.get(url + '?q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", function(error, response) {
					testStocksDataRecieved += 1;
					testStocksData.push(response.body);
					
					if(testStocksDataRecieved === testStocks.length) {
						var stocksJSONString = JSON.stringify({
							stocks: testStocks,
							stocksData: testStocksData
						});

						var reactHtml = ReactDOM.renderToString(ReactApp({stocks: stocks.stockList, stocksData: testStocksData}));
						res.render('index.ejs', {reactOutput: reactHtml, initialStocksData: stocksJSONString});
					}
				});				
			});


			// var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("YHOO","AAPL","GOOG","MSFT") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
			// var data = encodeURIComponent('select * from yahoo.finance.his0toricaldata where symbol in ("CERN") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
			// var data = encodeURIComponent('select * from yahoo.finance.quote where symbol in ("' + stockName + '") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
			// var data = encodeURIComponent('select * from yahoo.finance.his0toricaldata where symbol in ("' + stockName + '") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
			
			// $.getJSON(url, 'q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", function(){
			// 	var reactHtml = ReactDOM.renderToString(ReactApp({stocks: stocks.stockList}));
			// 	res.render('index.ejs', {reactOutput: reactHtml, initialStocksData: stocksJSONString});
			// });
			// Request.get(url + '?q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", function(error, response){
			// 	var reactHtml = ReactDOM.renderToString(ReactApp({stocks: stocks.stockList}));
			// 	res.render('index.ejs', {reactOutput: reactHtml, initialStocksData: stocksJSONString});
			// });

			// var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22)%20and%20startDate%20%3D%20%222015-04-10%22%20and%20endDate%20%3D%20%222016-04-12%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
			// Request.get(url, function(error, response){
			// 	var reactHtml = ReactDOM.renderToString(ReactApp({stocks: stocks.stockList}));
			// 	res.render('index.ejs', {reactOutput: reactHtml, initialStocksData: stocksJSONString});
			// });

			// var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
			// Request.get(url, stockDataRetrieved);
		};

		StockModels.getAllStocks(stockDataRetrieved);
		
		// var getAllStocksData = function(stocks) {
		// 	var stocksToDisplay = stocks.stockList;
		// 	console.log("stocks to display: ", stocksToDisplay);
		// 	var currentDate = new Date();

		// 	// var options = {
		// 	// 	stockName: '',
		// 	// 	startDate: '2015' + '-' + currentDate.getUTCMonth() + '-' + currentDate.getUTCDate(),
		// 	// 	endDate: currentDate.getUTCFullYear() + '-' + currentDate.getUTCMonth() + '-' + currentDate.getUTCDate(),
		// 	// 	apiKey: 'HQQiMV8deFVm49-uZM-X'
		// 	// }

		// 	var options = {
		// 		stockName: '',
		// 		startDate: '2015-06-29',
		// 		endDate: '2016-07-02',
		// 		apiKey: 'HQQiMV8deFVm49-uZM-X'
		// 	}

		// 	var stocksInformationRetrieved = 0;
		// 	var stocksLength = stocksToDisplay.length;

		// 	// Get all the stock information.
		// 	stocksToDisplay.forEach(function(stock){
		// 		console.log("stock: ", stock);
		// 		var stockData = [];

		// 		Request.get('https://www.quandl.com/api/v3/datasets/WIKI/' + stock + '.json?start_date=' 
		// 			+ options.startDate + '?end_date=' + options.endDate + '?api_key=' + options.apiKey, 
		// 			function(error, response){
		// 				console.log();
		// 				if (!error && response.statusCode == 200) {
		// 					stocksInformationRetrieved += 1;
		// 					stockData.push(response.body);

		// 					if(stocksInformationRetrieved === stocksLength) {
		// 						console.log("===================stockData array===============");
		// 						console.log("stockData: ", stockData);
		// 						console.log("===================stockData array===============");

		// 						var stocksDataString = JSON.stringify(stockData);

		// 						console.log("===================stockData string===============");
		// 						console.log("stockData: ", stocksDataString);
		// 						console.log("===================stockData string===============");
								
		// 						console.log("stock: ", stock);
		// 						var stocksJSONString = JSON.stringify(stocks);
		// 						var reactHtml = ReactDOM.renderToString(ReactApp({stocks: stocks.stockList}));
		// 						res.render('index.ejs', {reactOutput: reactHtml, initialStocksData: stocksJSONString});
		// 					}
		// 				}
		// 				else {
		// 				}
		// 			});
		// 	});
		// };
	});


	app.post('/insert', function(req, res){
		var stock = {
			name: req.body.name,
			description: req.body.description
		};

		var data = new StockModels(stock);

		data.save();
		res.json(stock);
	});

	app.post('/delete', function(req, res){
		StockModels.find({name: req.body.name}).remove(function(){
			res.send(req.body.name); //clean up 
		});
	});
}

module.exports = routes;