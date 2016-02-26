var Button = React.createClass({displayName: "Button",
	/* 
	 * Using closure to ensure delta and event object are available 
	 * It will invoke the handleButtonClicked function ProgressBarDemo 
	 * parent component passing delta value as the parameter
	 */
	buttonClicked: function (delta) {
		return function (event) {
			this.props.onButtonClick(delta);
		}.bind(this)
	},

	render: function () {
		return (
			React.createElement("div", {className: "large-3 medium-3 small-6 columns"}, 
				React.createElement("button", {onClick: this.buttonClicked(this.props.value), 
					className: "small radius"}, this.props.children
				)
			)
		);
	}
});