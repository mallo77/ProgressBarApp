var ButtonGroup = React.createClass({
	render: function () {
		//self alias is needed as 'this' will refer to different object
		//when used inside the callback function
		var self = this;

		return (	
			<div className="row">		
				{this.props.buttons.map(function (button) {
					return (
						<Button onButtonClick={self.props.onButtonClick} 
									value={button.value} key={button.value}>
							{button.label}
						</Button>
					);
				})}
			</div>	
		);
	}
});