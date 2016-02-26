var ProgressBarGroup = React.createClass({
	render: function () {
		return (	
			<div>		
				{this.props.bars.map(function (bar) {
					return (
						<ProgressBar value={bar.value} width={bar.width} key={bar.id}></ProgressBar>
					);
				})}
			</div>	
		);
	}
});