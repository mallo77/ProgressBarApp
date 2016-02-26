var ProgressBar = React.createClass({
	render: function () {		
		//dynamically set 'width' style 
		var style = {
			width: this.props.width + "%"
		};

		//dynamically add 'red' class
		var cls = parseInt(this.props.value, 10) > 100 
						? "meter red" : "meter"; 

		return (
			<div className="row">
				<div className="progress large-12 small-12 columns">
					<span className={cls} style={style}>
						<p className="percentage">{this.props.value + "%"}</p>
					</span>
				</div>
			</div>
		);
	}
});