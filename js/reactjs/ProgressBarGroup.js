var ProgressBarGroup = React.createClass({displayName: "ProgressBarGroup",
	render: function () {
		return (	
			React.createElement("div", null, 		
				this.props.bars.map(function (bar) {
					return (
						React.createElement(ProgressBar, {value: bar.value, width: bar.width, key: bar.id})
					);
				})
			)	
		);
	}
});