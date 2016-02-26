var Selector = React.createClass({
	/*
	 * It will invoke handleSelectChanged function in ProgressBarDemo 
	 * parent component passing progressbar ID as parameter
	 */ 
	selectChanged: function (event) {
		this.props.onSelectChange(event.target.value);
	},

	render: function () {
		return (
			<div className="large-5 medium-5 small-12 columns">
				<select onChange={this.selectChanged}>
					<option value="1">Progress #1</option>
					<option value="2">Progress #2</option>
					<option value="3">Progress #3</option>
				</select>
			</div>
		);
	}
});