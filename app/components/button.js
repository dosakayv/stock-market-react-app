var React = require("react");

var util = require('util');
// var yahooFinance = require('../..');

var yahooFinance = require("yahoo-finance");
var $ = require("jquery");


var makeGraph = function() {

	google.charts.load('current', {packages: ['corechart', 'line']});
	google.charts.setOnLoadCallback(drawLogScales);

	function drawLogScales() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Dogs');
      data.addColumn('number', 'Cats');

      data.addRows([
        [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
        [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
        [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
        [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
        [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
        [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
        [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
        [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
        [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
        [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
        [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
        [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
      ]);

      var options = {
        hAxis: {
          title: 'Time',
          logScale: true
        },
        vAxis: {
          title: 'Popularity',
          logScale: false
        },
        colors: ['#a52714', '#097138']
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }

}

var input = React.createClass({
	getInitialState: function() {
    	return {email: ''}
    },
	handleChange: function(event) {
		console.log(event.target.value);
	    // this.setState({value: event.target.value});
	    this.setState({email: event.target.value});
	},
	handleClick: function(event) {
		console.log("works google 1")
		console.log(google)
		console.log("works google 1")
		
		console.log("makes graph 1")
		makeGraph()
		console.log("makes graph 2")

		console.log("This button works 1");
		// yahooFinance.historical({
		//   symbol: this.state.email,
		//   from: '2012-01-01',
		//   to: '2012-12-31',
		//   period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
		// }, function (err, quotes) {
		// 	console.log("This api call works");
		// 	console.log("quotes", quotes);
		// });
		
		// function reqListener () {
		// 	console.log(this.responseText);
		// }

		// var oReq = new XMLHttpRequest();
		// oReq.addEventListener("load", reqListener);
		// oReq.open("GET", "http://www.example.org/example.txt");
		// oReq.send();
	
		var callback = function(_return) {
	    	var totalReturned = _return.query.count;
		    //OR: var totalReturned = _return.query.results.quote.length;
		    for (var i = 0; i < totalReturned; ++i) {
		        var stock = _return.query.results.quote[i];
		        var symbol = stock.symbol;
		        var percent_change = stock.Change_PercentChange;
		        var changeRealTime = stock.ChangeRealtime;
	    	}
	    };

		// This works
	    var getStock = function(stockName){
			// console.log("stockName: ", stockName);
			// var stock = stockName + "";
		 	var url = 'http://query.yahooapis.com/v1/public/yql';
			var startDate = '2016-04-10';
			var endDate = '2016-04-12';
			// var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("YHOO","AAPL","GOOG","MSFT") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
			// var data = encodeURIComponent('select * from yahoo.finance.his0toricaldata where symbol in ("CERN") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
			var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("' + stockName + '") and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
			$.getJSON(url, 'q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json", callback);
	    }

		getStock(this.state.email);
		// This works

		// Trying to get this to work
	  //   var getStock = function(stockName){
	  //   	var SYMBOL = 'AAPL';

			// yahooFinance.historical({
			//   symbol: SYMBOL,
			//   from: '2012-01-01',
			//   to: '2012-12-31',
			//   period: 'd'
			// }, function(err, result){
			// 	console.log(util.format(
			// 	'=== %s (%d) ===',
			// 	SYMBOL,
			// 	quotes.length
			// 	).cyan);
				
			// 	console.log("within yahoo node finace 1");
			// 	console.log("result", result);
			// 	console.log("within yahoo node finace 2");
			// })
	  //   }
		// Trying to get this to work

		getStock();
		console.log("This button works 3 ogabogaboga");
	},
	render: function() {
		// return (<div>TEST I AM THE SHIT</div>);
		// return (<input type="text" value="Hello!" />);
		// return (<input type="text" value="{this.state.searchString}" onChange={this.handleChange} placeholder="Type here" />);
		return (
		// <button onClick={this.onClick.bind(this)}/>
			<div>
				<input name="email" value={this.state.email} onChange={this.handleChange}/>
				<button type="button" disabled={!this.state.email} onClick={this.handleClick}>Button</button>
			</div>
		);
	}
});

module.exports = input;