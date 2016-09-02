var React = require("react");

var input = React.createClass({
	handleChange: function(event) {
		console.log(event.target.value);
	    this.setState({value: event.target.value});
	},
	onClick: function(event) {
		console.log("This button works");
	},
	render: function() {
		return (<div>TEST I AM THE BOMB</div>);
		// return (<input type="text" value="Hello!" />);
		// return (<input type="text" value="{this.state.searchString}" onChange={this.handleChange} placeholder="Type here" />);
		// return (<button onClick={this.onClick.bind(this)}/>);
	}
});

module.exports = input;