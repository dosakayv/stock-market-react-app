var React = require("react");

var stocks = React.createClass({
	render: function() {
		return (
			<div>
				<div>stocks CLASS</div>
				<div>{this.props.stocks}</div>
				<button type="button" id="test1" className="test2" onClick = {this.props.deleteStock}>DELETESTOCK</button>
				<div>stocks CLASS</div>
			</div>
		);
	}
});

module.exports = stocks;