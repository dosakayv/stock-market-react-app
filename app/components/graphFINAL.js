var React = require("react");
var Highstocks = require("highcharts/highstock");

var Highcharts = require("highcharts");

console.log("Highcharts themes")
console.log(Highcharts)
console.log("Highcharts themes")

var graph = React.createClass({
	componentWillUpdate: function(){
		console.log("component is about to update HALLAUAH!!!");

		console.log("stocksData");
		console.log(this.props.stocksData);
		console.log("stocksData");

		console.log("stock chart");
		console.log(this.chart);
		console.log("stock chart");

		// if we have more stock data than before we are adding
		// if (this.props.stocksData.length > (this.chart.series.length - 1)) {
		// 	var arrayWithAllStockData = this.props.stocksData;
		// 	var stockDataToAddToGraphSeries = {
		// 		name: arrayWithAllStockData[arrayWithAllStockData.length - 1].query.results.quote[0].Symbol,
		// 		data: []
		// 	};

		// 	arrayWithAllStockData[arrayWithAllStockData.length - 1].query.results.quote.forEach(function(quote){
		// 		var dataArray = quote.Date.split("-");
		// 		stockDataToAddToGraphSeries.data.unshift([
		// 			Date.UTC(dataArray[0], (dataArray[1] - 1), dataArray[2]),
		// 			parseFloat(quote.Close)
		// 		]);
		// 	});

		// 	this.chart.addSeries(stockDataToAddToGraphSeries);			
		// }
		// else {
		// 	// we are deleting from the graph

		// 	// Have to find the stock that we are deleting
		// 	var nameOfStockToDelete = "";
		// 	var self = this;
		// 	// The current stocks
		// 	var currentStocks = [];
		// 	this.props.stocksData.forEach(function(stock){
		// 		if (typeof stock === "string") {
		// 			var stock = JSON.parse(stock);
		// 		}
		// 		currentStocks.push(stock.query.results.quote[0].Symbol)
		// 	});
		// 	// Loop through the chart series till you find a stock that is not in current series.
		// 	var indexOfSeriesToRemove;
		// 	this.chart.series.some(function(singleSeries, index){
		// 		var stockIndex = currentStocks.indexOf(singleSeries.name);
		// 		if (stockIndex > -1 || singleSeries.name === "Navigator") {
		// 			return false;
		// 		} else {
		// 			indexOfSeriesToRemove = index;
		// 			return true;
		// 		}
		// 	});
		// 	this.chart.series[indexOfSeriesToRemove].remove();
		// }


	},
	componentDidMount: function() {

		// MOVE TO OWN MODULE

// Load the fonts
Highcharts.createElement('link', {
	href: 'https://fonts.googleapis.com/css?family=Unica+One',
	rel: 'stylesheet',
	type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
	colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	chart: {
		backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			stops: [
				[0, '#2a2a2b'],
				[1, '#3e3e40']
			]
		},
		style: {
			fontFamily: "'Unica One', sans-serif"
		},
		plotBorderColor: '#606063'
	},
	title: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase',
			fontSize: '20px'
		}
	},
	subtitle: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase'
		}
	},
	xAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#E0E0E3'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		title: {
			style: {
				color: '#A0A0A3'

			}
		}
	},
	yAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#E0E0E3'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		tickWidth: 1,
		title: {
			style: {
				color: '#A0A0A3'
			}
		}
	},
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
		style: {
			color: '#F0F0F0'
		}
	},
	plotOptions: {
		series: {
			dataLabels: {
				color: '#B0B0B3'
			},
			marker: {
				lineColor: '#333'
			}
		},
		boxplot: {
			fillColor: '#505053'
		},
		candlestick: {
			lineColor: 'white'
		},
		errorbar: {
			color: 'white'
		}
	},
	legend: {
		itemStyle: {
			color: '#E0E0E3'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#606063'
		}
	},
	credits: {
		style: {
			color: '#666'
		}
	},
	labels: {
		style: {
			color: '#707073'
		}
	},

	drilldown: {
		activeAxisLabelStyle: {
			color: '#F0F0F3'
		},
		activeDataLabelStyle: {
			color: '#F0F0F3'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#DDDDDD',
			theme: {
				fill: '#505053'
			}
		}
	},

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: '#505053',
			stroke: '#000000',
			style: {
				color: '#CCC'
			},
			states: {
				hover: {
					fill: '#707073',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				},
				select: {
					fill: '#000003',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				}
			}
		},
		inputBoxBorderColor: '#505053',
		inputStyle: {
			backgroundColor: '#333',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(255,255,255,0.1)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		},
		xAxis: {
			gridLineColor: '#505053'
		}
	},

	scrollbar: {
		barBackgroundColor: '#808083',
		barBorderColor: '#808083',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: '#606063',
		buttonBorderColor: '#606063',
		rifleColor: '#FFF',
		trackBackgroundColor: '#404043',
		trackBorderColor: '#404043'
	},

	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	background2: '#505053',
	dataLabelsColor: '#B0B0B3',
	textColor: '#C0C0C0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
// Highcharts.setOptions(Highcharts.theme);

		// MOVE TO OWN MODULE


		console.log("stocksData");
		console.log(this.props.stocksData);
		console.log("stocksData");

		console.log("Highcharts themes client")
		console.log(Highcharts)
		console.log("Highcharts themes client")
		var stockGraphData = [];
		this.props.stocksData.forEach(function(stock){
			var stock = JSON.parse(stock);
			var stockInfo = {
				name: "",
				data: []
			};
			stockInfo.name = stock.query.results.quote[0].Symbol;

			stock.query.results.quote.forEach(function(quote){
				var dataArray = quote.Date.split("-");
				stockInfo.data.unshift([
					Date.UTC(dataArray[0], (dataArray[1] - 1), dataArray[2]),
					parseFloat(quote.Close)
				]);
			});

			stockGraphData.push(stockInfo);
		});



		console.log("stockGraphData after");
		console.log(stockGraphData);
		console.log("stockGraphData after");


		// var testData = [
		//     [Date.UTC(2007,7,21),0.7429],
		//     [Date.UTC(2007,7,22),0.7383],
		//     [Date.UTC(2007,7,23),0.7369],
		//     [Date.UTC(2007,7,24),0.7309],
		//     [Date.UTC(2007,7,27),0.7329],
		//     [Date.UTC(2007,7,28),0.7352],
		//     [Date.UTC(2007,7,29),0.7311],
		//     [Date.UTC(2007,7,30),0.7331],
		//     [Date.UTC(2007,7,31),0.7337]
	 //    ];

		var container = "stockChart";
		var options =
		{
		    rangeSelector: {
		      selected: 4
		    },
		    title: {
		      text: 'VISHNU BITCHING STOCK CHART'
		    },
		    tooltip: {
		      valueDecimals: 2
		    },
		    series: stockGraphData
		  };
		  
		Highstocks.setOptions(Highcharts.theme);

		this.chart = new Highstocks["StockChart"](
		    container,
		    options
		);


	},
	componentWillReceiveProps: function(nextProps) {
		console.log(nextProps);

		// if we have more stock data than before we are adding
		if (nextProps.stocksData.length > (this.chart.series.length - 1)) {
			var arrayWithAllStockData = nextProps.stocksData;
			var stockDataToAddToGraphSeries = {
				name: arrayWithAllStockData[arrayWithAllStockData.length - 1].query.results.quote[0].Symbol,
				data: []
			};

			arrayWithAllStockData[arrayWithAllStockData.length - 1].query.results.quote.forEach(function(quote){
				var dataArray = quote.Date.split("-");
				stockDataToAddToGraphSeries.data.unshift([
					Date.UTC(dataArray[0], (dataArray[1] - 1), dataArray[2]),
					parseFloat(quote.Close)
				]);
			});

			this.chart.addSeries(stockDataToAddToGraphSeries);			
		}
		else {
			// we are deleting from the graph

			// Have to find the stock that we are deleting
			var nameOfStockToDelete = "";
			var self = this;
			// The current stocks
			var currentStocks = [];
			nextProps.stocksData.forEach(function(stock){
				if (typeof stock === "string") {
					var stock = JSON.parse(stock);
				}
				currentStocks.push(stock.query.results.quote[0].Symbol)
			});
			// Loop through the chart series till you find a stock that is not in current series.
			var indexOfSeriesToRemove;
			this.chart.series.some(function(singleSeries, index){
				var stockIndex = currentStocks.indexOf(singleSeries.name);
				if (stockIndex > -1 || singleSeries.name === "Navigator") {
					return false;
				} else {
					indexOfSeriesToRemove = index;
					return true;
				}
			});
			this.chart.series[indexOfSeriesToRemove].remove();
		}

	},
	render: function() {
		return (
			<div>
				<div id = "stockChart"></div>
			</div>
		);
	}
});

module.exports = graph;