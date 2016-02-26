var ProgressBar = React.createClass({displayName: "ProgressBar",
	render: function () {		
		//dynamically set 'width' style 
		var style = {
			width: this.props.width + "%"
		};

		//dynamically add 'red' class
		var cls = parseInt(this.props.value, 10) > 100 
						? "meter red" : "meter"; 

		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "progress large-12 small-12 columns"}, 
					React.createElement("span", {className: cls, style: style}, 
						React.createElement("p", {className: "percentage"}, this.props.value + "%")
					)
				)
			)
		);
	}
});