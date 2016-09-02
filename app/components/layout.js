var React = require("react");

// This works
// var Materialui = require("material-ui");

// var AppBar = Materialui.AppBar;
// var RaisedButton = Materialui.RaisedButton;
// var darkBaseTheme = require("material-ui/styles/baseThemes/darkBaseTheme");
// var MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default;
// var getMuiTheme = require("material-ui/styles/getMuiTheme").default;

// console.log("getMuiTheme");
// console.log(getMuiTheme);
// console.log("getMuiTheme");

// console.log("MuiThemeProvider");
// console.log(MuiThemeProvider);
// console.log("MuiThemeProvider");
// This works

// This does not work yet
// var Materialui = require("material-ui");
// var MuiThemeManager = require("material-ui/styles/themeManager").default;

// console.log("ThemeManager");
// console.log(MuiThemeManager);
// console.log("ThemeManager");

// var ThemeManager = new mui.Styles.ThemeManager()
// ThemeManager.setTheme(ThemeManager.types.LIGHT);

// var Card = Materialui.Card;
// This does not work yet


var StockInput = require("../components/inputFINAL.js");
var StockGraph = require("../components/graphFINAL.js");
var Stocks = require("../components/stocksFINAL.js");

var Request = require('request');
var $ = require("jquery");
// var mongoose = require("mongoose")
// var StockModels = require("../models/stock.js");

var stocksToDisplay = [];
var stocksData = [];

var layout = React.createClass({
	getInitialState: function() {
		stocksToDisplay = this.props.stocks;
		
		// console.log("stocks to display");
		// console.log(stocksToDisplay);
		// console.log("stocks to display");
		
		stocksData = this.props.stocksData;

		// console.log("stockData to display");
		// console.log(stocksData);
		// console.log("stockData to display");

		// this.getAllStocksData(stocksToDisplay);
		return {
			stockList: stocksToDisplay,
			stocksData: stocksData
		}
	},
	getAllStocksData: function(stocksToDisplay) {
		var url = 'https://query.yahooapis.com/v1/public/yql';
		var startDate = '2016-04-10';
		var endDate = '2016-04-12';
		
		var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("YHOO","AAPL","GOOG","MSFT") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');

		console.log("jquery");
		console.log($);
		console.log("jquery");

		$.getJSON(url, 'q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", function(error, response){
			console.log("I dont know why this fucking works but I will find out if it the death of me");
			console.log(response);
			console.log("I dont know why this fucking works but I will find out if it the death of me");
		});
	},
	// getAllStocksData: function(stocksToDisplay) {
	// 	// var stocksToDisplay = stocks.stockList;
	// 	console.log("stocks to display: ", stocksToDisplay);
	// 	var currentDate = new Date();

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
	// },
	componentDidMount: function() {
		// console.log("stocksData:", {this.props});
		// console.log("stocksData:", {this.state});
	},
	addStock: function(stockData) {
		console.log("about to add the stocks");
		console.log(stockData);
		console.log("about to add the stocks");

		console.log("about to add the stocks");
		console.log(stocksData);
		console.log("about to add the stocks");

		console.log("about to add the stocksToDisplay");
		console.log(stocksToDisplay);
		console.log("about to add the stocksToDisplay");

		console.log("about to add the stocksToDisplay damn come on");
		console.log(stockData);
		console.log(stockData.query);
		console.log(stockData.query.results);
		console.log(stockData.query.results.quote[0]);
		console.log("about to add the stocksToDisplay damn come on");

		// stocksToDisplay.push(stockData.dataset.name);
		var stockSymbol = stockData.query.results.quote[0].Symbol;
		// stocksToDisplay.push(stockSymbol);

		var stockListArray = this.state.stockList.slice();
		stockListArray.push(stockSymbol);	

		console.log("added stocksToDisplay");
		console.log(stocksToDisplay);
		console.log("added stocksToDisplay");

		var self = this;
		// Request.post({url: 'http://localhost:4000/insert', form:{name: stockData.dataset.dataset_code, description: stockData.dataset.name}}, function(err,httpResponse,body){
		// Request.post({url: 'http://localhost:4000/insert', form:{name: stockSymbol, description: stockSymbol}}, function(err,httpResponse,body){
		
		// Have to figure out proper way to post!!!!! vishnu
		Request.post({url: 'https://react-stock-app.herokuapp.com/insert', form:{name: stockSymbol, description: stockSymbol}}, function(err,httpResponse,body){
			console.log(err);
			console.log(httpResponse);
			console.log(body);
			console.log("vishnu you are too cool");
			var stocksDataArray = self.state.stocksData.slice();
			stocksDataArray.push(stockData);
			self.setState({
				stockList: stockListArray,
				stocksData: stocksDataArray
			});
		});
	},
	deleteStock: function(stock) {
		console.log("about to add the stocks");
		console.log(stocksData);
		console.log("about to add the stocks");

		console.log("about to add the stocksToDisplay");
		console.log(stocksToDisplay);
		console.log("about to add the stocksToDisplay");
		
		console.log("vishnu you are about to delete");
		var self = this;

		function findStock(stockName, stockArray) {
			var stockIndex;
			stockArray.some(function(stock, index) {
				if (typeof stock === "string") {
					if (stock.indexOf(stockName) > -1) {
						stockIndex = index;
						return true;
					}
				}
				else if (typeof stock === "object") {
					if (stock.query.results.quote[0].Symbol === stockName) {
						stockIndex = index;
						return true;
					}
				}
				else {
					return false;
				}
			});

			return stockIndex;
		}
		// Request.post({url: 'http://localhost:4000/delete', form:{name: "GOOG"}}, function(err,httpResponse,body){
		// Request.post({url: 'http://localhost:4000/delete', form:{name: stock}}, function(err,httpResponse,body){

		// Have to figure out proper way to post!!!!! vishnu
		Request.post({url: 'https://react-stock-app.herokuapp.com/delete', form:{name: stock}}, function(err,httpResponse,body){
			// have to remove from list now 

			// var indexOfStockToRemove = stocksToDisplay.indexOf(body);
			// stocksToDisplay.splice(indexOfStockToRemove, 1);
			// stocksData.splice(indexOfStockToRemove, 1);

			var stockListArray = self.state.stockList.slice();
			var stocksDataArray = self.state.stocksData.slice();

			var indexOfStockToRemoveFromStockList = stockListArray.indexOf(body);
			stockListArray.splice(indexOfStockToRemoveFromStockList, 1);

			var indexOfStockToRemoveFromStockData = findStock(body, stocksDataArray);
			stocksDataArray.splice(indexOfStockToRemoveFromStockData, 1);

			self.setState({
				stockList: stockListArray,
				stocksData: stocksDataArray
			});

		console.log("about to add the stocks");
		console.log(stocksData);
		console.log("about to add the stocks");

		console.log("about to add the stocksToDisplay");
		console.log(stocksToDisplay);
		console.log("about to add the stocksToDisplay");



			console.log("self");
			console.log(self);
			console.log("self");

			console.log("err");
			console.log(err);
			console.log("err");

			console.log("httpResponse");
			console.log(httpResponse);
			console.log("httpResponse");

			console.log("body");
			console.log(body);
			console.log("body");
		});
	},
	// updateGraph: function() {
	// 	console.log("about to update the graph");
	// },

	// render: function() {
	// 	return (
	// 		<div>
	// 		    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
	// 		    	<AppBar title="My AppBar" />
	// 		    </MuiThemeProvider>
	// 		    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
	// 		    	  <div>
	// 				    <RaisedButton label="Default" />
	// 				    <RaisedButton label="Primary" primary={true} />
	// 				    <RaisedButton label="Secondary" secondary={true} />
	// 				    <RaisedButton label="Disabled" disabled={true} />
	// 				  </div>
	// 		    </MuiThemeProvider>
	// 			<div>WITH IN LAYOUT</div>
	// 			<Stockinput text="THIS BLOODY HELL WORKS"/>
	// 			<div>Passing the state</div>
	// 			<div>{this.props.stocksData}</div>
	// 			<div>Passing the state</div>
	// 		</div>
	// 	);
	// }
	render: function() {
		return (
			<div>
				<div className="stock-input">
					<StockInput addStock={this.addStock} stocks = {this.state.stockList} stocksData = {this.state.stocksData} deleteStock = {this.deleteStock}/>
				</div>
				<div className="stock-graph">
					<StockGraph stocksData = {this.state.stocksData}/>
				</div>
			</div>
		);
	}
});

module.exports = layout;
