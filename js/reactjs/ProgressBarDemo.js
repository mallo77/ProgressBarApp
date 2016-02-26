var ProgressBarDemo = React.createClass({displayName: "ProgressBarDemo",
	//set initial state i.e. which progressbar is active
	//the original delta value and initial progressbar data
	getInitialState: function () {
		return {
			active: 1,
			delta: 0,
			barData: [
				{ id: 1, value: 25, width: 25 },
				{ id: 2, value: 50, width: 50 },
				{ id: 3, value: 75, width: 75 }
			]
		}
	},

	//helper function to update progressbar data
	//by checking the active progressbar and the delta value
	barOptions: function () {
		var activeBar = parseInt(this.state.active, 10);
		var delta = parseInt(this.state.delta, 10);

		//skip if delta is 0
		if ( delta !== 0 ) {
			this.state.barData.forEach(function (elem, idx) {
				if ( elem.id === activeBar ) {
					var newVal = elem.value + delta;
					
					//reset to zero if value less than zero
					newVal = newVal < 0 ? 0 : newVal;

					//set maximum 'width' to 100
					elem.width = newVal > 100 ? 100 : newVal;

					elem.value = newVal;
				}
			});
		}

		//reset delta back to zero
		this.state.delta = 0;

		return this.state.barData;
	},

	//called to set which progressbar is to be activated
	handleSelectChanged: function (id) {
		this.state.active = id;	
		this.setState(this.state);
	},

	//called to set the value of delta
	handleButtonClicked: function (delta) {
		this.state.delta = delta;
		this.setState(this.state);
	},

	render: function () {
		//data values for buttons
		var buttonOptions = [
			{ value: '-25', label: '-25' },
			{ value: '-10', label: '-10' },
			{ value: '10', label: '10' },
			{ value: '25', label: '25' },
		];

		return (
			React.createElement("section", {className: "progress-bar-demo"}, 
	  			React.createElement("div", {className: "row"}, 
		    		React.createElement("div", {className: "small-11 medium-11 large-10 columns small-centered"}, 
		      			React.createElement("h2", null, "Progress Bars Demo"), 		        	

						React.createElement(ProgressBarGroup, {bars: this.barOptions()}), 
		        					
				        React.createElement("div", {className: "row panel"}, 
			        	  	React.createElement(Selector, {onSelectChange: this.handleSelectChanged}), 
				         	
				         	React.createElement("div", {className: "large-7 medium-7 small-12 columns"}, 
				         		React.createElement(ButtonGroup, {onButtonClick: this.handleButtonClicked, 
				         				buttons: buttonOptions})						        
				            )			        
				        )	      
			    	)
		  		)
			)
		);
	}
});