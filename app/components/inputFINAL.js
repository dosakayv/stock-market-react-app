var React = require("react");
var Request = require("request");

var Materialui = require("material-ui");
var TextField = Materialui.TextField;
var RaisedButton = Materialui.RaisedButton;
var Card = Materialui.Card;
var CardTitle = Materialui.CardTitle;
var CardText = Materialui.CardText;
var CardActions = Materialui.CardActions;
var FlatButton = Materialui.FlatButton;
var Snackbar = Materialui.Snackbar;

var darkBaseTheme = require("material-ui/styles/baseThemes/darkBaseTheme");
var MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default;
var getMuiTheme = require("material-ui/styles/getMuiTheme").default;

var ActionTrendingDown = require("material-ui/svg-icons/action/trending-down").default;
var ActionTrendingUp = require("material-ui/svg-icons/action/trending-up").default;

var $ = require("jquery");

var options = {
  stockName: '',
  startDate: '2016-06-29',
  endDate: '2016-07-02',
  apiKey: 'HQQiMV8deFVm49-uZM-X'
}

var getStockData = function(stockName, addStockCallback, self) {

	// This works for one stock
	// Request.get('https://www.quandl.com/api/v3/datasets/WIKI/' + stockName + '.json?start_date=' 
	// 	+ options.startDate + '?end_date=' + options.endDate + '?api_key=' + options.apiKey, 
	// 	function(error, response){
	// 		if (!error && response.statusCode == 200) {
	// 			// updateGraphCallback();
	// 			addStockCallback(JSON.parse(response.body));
	// 		}
	// 		else {

	// 		}
	// 	});
	// This works for one stock

	// repeating code have to delete
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
	// repeating code have to delete

	var callback = function(response){
		if (!!response.query.results) {
			self.setState({
				disableAddButton: false
			});
			addStockCallback(response);
		}
		else {
			self.setState({
				openSnackBar: true,
				snackBarMessages: "This stock does not exist. Please check the stock symbol again."
			});
		}
	};
	var url = 'https://query.yahooapis.com/v1/public/yql';

	var dates = getStartAndEndDates();

	var startDate = dates.startDate;
	var endDate = dates.endDate;
	
	var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("' + stockName + '") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
	// var data = encodeURIComponent('select * from yahoo.finance.quotes where symbol in ("' + stockName + '")');
	
	$.getJSON(url, 'q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", callback);
	// Request.get(url + '?q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", callback);

};

var stockToAdd = "";

var input = React.createClass({
	componentDidMount: function() {
		// console.log(this.props.stocks);
		// console.log(this.props.stocksData);
	},
	getInitialState: function() {
		var initialState = {
			openSnackBar: false,
			snackBarMessages: "",
			disableAddButton: false
		};

		return initialState
	},
	handleChange: function(event) {
		stockToAdd = event.target.value.toUpperCase();
	},
	handleAddButtonClick: function(event) {
		if (this.props.stocks.indexOf(stockToAdd) > -1) {
			this.setState({
				openSnackBar: true,
				snackBarMessages: "This stock already exists in the stock list to the left."
			});
		}
		else {
			this.setState({
				disableAddButton: true
			})
			getStockData(stockToAdd, this.props.addStock, this);
		}
	},
	handleDeleteButtonClick: function(event) {
		var stockToDelete = event.currentTarget.id;
		this.props.deleteStock(stockToDelete);
	},
	componentWillReceiveProps: function() {
		this.setState({
			openSnackBar: false,
			snackBarMessages: ""
		});
	},
	render: function() {
		var stockHTML = [];
		var self = this;

		var iconStyles = {
			height: "20px",
			width: "20px"
		};

		var allStocksDataObject = self.props.stocksData.map(function(stockData) {
			if (typeof stockData === "string") {
				return JSON.parse(stockData);
			}
			else {
				return stockData;
			}
		});

		var stockDataArray = [];
		function findStock(stockName) {
			allStocksDataObject.some(function(stockData) {	
				if (stockData.query.results.quote[0].Symbol.toUpperCase() === stockName.toUpperCase()) {
					stockDataArray = stockData;
					return true;
				}
				else {
					return false;
				}
			});
		}
		
		this.props.stocks.forEach(function(stock, index){
			findStock(stock, stockDataArray);

			var stockCloseToday = parseFloat(stockDataArray.query.results.quote[0].Close);
			var yesterdayStockClose =  parseFloat(stockDataArray.query.results.quote[1].Close);
			var stockDifferenceInDay = stockCloseToday - yesterdayStockClose;
			var stockTrend = (stockDifferenceInDay/yesterdayStockClose) * 100;

			var stockToday = stockDataArray.query.results.quote[0];

			var stockTrendIcon = [];
			var stockTrendIconColor = "";
			if (stockDifferenceInDay >= 0) {
				stockTrendIconColor = {
					"color": "#4CAF50"
				}
				stockTrendIcon.push(<ActionTrendingUp style={iconStyles} color="#4CAF50"/>);
			}
			else {
				stockDifferenceInDay = stockDifferenceInDay * (-1);
				stockTrend = stockTrend * (-1);
				stockTrendIconColor = {
					"color": "#F44336"
				};
				stockTrendIcon.push(<ActionTrendingDown style={iconStyles} color="#F44336"/>);
			}

			var cardTextTitleStyle = {
				"padding": "16px 0px 0px 16px",
				"font-size": "24px"
			};

			var cardTextContentStyle = {
				"padding": "4px 0px 0px 16px",
				"color": "#9E9E9E"
			};

			var cardActionsStyle = {
				"padding-left": "16px"
			};

			stockHTML.push(
				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<Card className="stockCard" id={stock}>
						<CardText style={cardTextTitleStyle}>
							<div>{stock}</div>
							<div>
								<span>{stockCloseToday.toFixed(2)} </span>
								<span style={stockTrendIconColor}>{stockTrendIcon} {stockDifferenceInDay.toFixed(2)} ({stockTrend.toFixed(2)}%)</span>
							</div>
						</CardText>
						<CardText style={cardTextContentStyle}>
							<div>Open: {parseFloat(stockToday.Open).toFixed(2)}</div>
							<div>High: {parseFloat(stockToday.High).toFixed(2)}</div>
							<div>Low: {parseFloat(stockToday.Low).toFixed(2)}</div>
						</CardText>
						<CardActions style={cardActionsStyle}>
							<RaisedButton id={stock} backgroundColor="#F44336" label="DELETE" onClick={self.handleDeleteButtonClick}/>
						</CardActions>
					</Card>
				</MuiThemeProvider>	
			)
		});

		return (
			<div> 
				<div className="stockInputContainer">
					<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
						<TextField className="stockInput" hintText="GOOG (ex. Google)" floatingLabelText="Enter Stock Symbol" onChange={this.handleChange}/>
					</MuiThemeProvider>
					<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
						<RaisedButton className="addStockButton" backgroundColor="#a4c639" label="ADD" onClick={this.handleAddButtonClick} disabled={this.state.disableAddButton}/>
					</MuiThemeProvider>
				</div>
				<div className="stockCardsContainer">
					{stockHTML}
				</div>
				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<Snackbar className="warningMessage" open={this.state.openSnackBar} message={this.state.snackBarMessages}/>			
				</MuiThemeProvider>
			</div>
		);
	}
});

module.exports = input;