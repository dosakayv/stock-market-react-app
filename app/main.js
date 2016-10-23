var React = require("react");
var ReactDOM = require("react-dom");
var ReactApp = require("./components/layout.js");

var initialStockData = JSON.parse(document.getElementById("initial-data").innerHTML);

var mountNode = document.getElementById("react-main-mount");
ReactDOM.render(<ReactApp stocks={initialStockData.stocks} stocksData={initialStockData.stocksData}/>, mountNode);
// ReactDOM.render(<ReactApp />, mountNode);
// ReactDOM.render(ReactApp({stocksData: JSON.stringify(docs)}), mountNode);
// ReactDOM.render(new ReactApp({stocks: initialStockData.stockList}), mountNode);