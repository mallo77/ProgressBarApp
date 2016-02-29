(function () {
	//Progressbar initial data
	var _barData = [
		{ id: 1, value: 25, width: 25 },
		{ id: 2, value: 50, width: 50 },
		{ id: 3, value: 75, width: 75 }
	];
	
	//Selector dropdown initial data
	var _selectorOptions = [
		{ id: 1, name: 'Progress #1', selected: true },
		{ id: 2, name: 'Progress #2', selected: false },
		{ id: 3, name: 'Progress #3', selected: false }
	];

	//Button data
	var _buttonOptions = [
		{ value: '-25', label: '-25' },
		{ value: '-10', label: '-10' },
		{ value: '10', label: '10' },
		{ value: '25', label: '25' },
	];

	//Helper function to get the currently selected progressbar
	var _selectedBar = function () {
		var selectedOptions = _selectorOptions.filter(function (option) {
			return option.selected;
		});
		return (selectedOptions && selectedOptions.length > 0 ) ? (selectedOptions[0]).id : 1;
	};

	//Button component
	var Button = Ractive.extend({
		template: '#tmpl-button',
		
		oninit: function () {
			//Event handler for button click
			this.on('buttonClicked', function (event) {
				var delta = parseInt(event.context.value, 10);
				var activeBar = parseInt(_selectedBar(), 10);
				
				//skip if delta is 0
				if ( delta !== 0 ) {
					_barData.forEach(function (elem, idx) {
						if ( elem.id === activeBar ) {
							var newVal = elem.value + delta;
							
							//reset to zero if value less than zero
							newVal = newVal < 0 ? 0 : newVal;

							//set overflow value to true and maximum 'width' to 100
							if ( newVal > 100 ) {
								elem.overflow = true;
								elem.width = 100;
							}
							else {
								elem.overflow = false;
								elem.width = newVal;
							}
							
							elem.value = newVal;
						}
					});
				}

				//find 'myProgressBar' instance and call its update() method 
				var progressBar = app.findComponent('myProgressBar');
				if ( progressBar ) {
					progressBar.update();
				}
			});
		},

		data: {
			buttons: function () {
				return _buttonOptions;
			}
		}
	});

	//Selector component
	var Selector = Ractive.extend({
		template: '#tmpl-selector',
		
		oninit: function () {
			//Event handler for dropdown selector changes
			this.on('activateBar', function () {
				var selectedBar = this.get('selectedBar');

				_selectorOptions.forEach(function (elem, idx) {
					if ( selectedBar === elem.id ) {
						elem.selected = true;
					}
					else {
						elem.selected = false;
					}
				});
			});

			this.set('selectedBar', _selectedBar());
		},
		
		data: {
			selectedBar: null,
			options: function () {
				return _selectorOptions;
			}		
		}				
	});

	//ProgressBar component
	var ProgressBar = Ractive.extend({
		template: '#tmpl-progressbar',
		
		data: {
			bars: function () {
				return _barData;
			}
		}
	});

	//The main app
	var app = new Ractive({
		el: '#demo',
		template: '#tmpl-app',
		components: {
			myButton: Button,
			mySelector: Selector,
			myProgressBar: ProgressBar
		}
	});
})();