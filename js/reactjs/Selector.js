var Selector = React.createClass({displayName: "Selector",
	/*
	 * It will invoke handleSelectChanged function in ProgressBarDemo 
	 * parent component passing progressbar ID as parameter
	 */ 
	selectChanged: function (event) {
		this.props.onSelectChange(event.target.value);
	},

	render: function () {
		return (
			React.createElement("div", {className: "large-5 medium-5 small-12 columns"}, 
				React.createElement("select", {onChange: this.selectChanged}, 
					React.createElement("option", {value: "1"}, "Progress #1"), 
					React.createElement("option", {value: "2"}, "Progress #2"), 
					React.createElement("option", {value: "3"}, "Progress #3")
				)
			)
		);
	}
});