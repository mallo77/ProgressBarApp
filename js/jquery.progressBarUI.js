/*! progressBar-UI */
jQuery.progressBarUI = (function ( $ ) {	
	var _$body = $('body'),
		
		_initBars = function () {
			var $progressbar1 = $('#progress1');
			var $progressbar2 = $('#progress2');
			var $progressbar3 = $('#progress3');

			$progressbar1.hbsRenderTmpl({
				tmpl: {
					data: {
						id: "1", 
						value: "30", 
						default: true
					}
				}					
			});

			$progressbar2.hbsRenderTmpl({
				tmpl: {
					data: {
						id: "2", 
						value: "50",
						default: false
					}
				}					
			});

			$progressbar3.hbsRenderTmpl({
				tmpl: {
					name: "progressbar", 
					data: {
						id: "3", 
						value: "75",
						default: false
					}
				}					
			});	
		},

		_bindEvents = function () {
			_bindSelector();
			_bindButtons();
		},

		_bindSelector = function () {
			$("#selector").on("change", function () {
				var selectedBar = "bar" + $("#selector").val();
				
				//remove 'active' class
				$(".meter").removeClass("active");

				//set 'active' class to the selected bar
				$("#" + selectedBar).addClass("active");	
			});  
		},

		_bindButtons = function () {
			$("button").on("click", function () {
				var buttonVal = parseInt($(this).attr("data-button"), 10);
				var barVal 	  = parseInt($(".active").attr("data-value"), 10);
				var newBarVal = buttonVal + barVal;

				var $spanEl = $(".active");
				var $pEl    = $(".active p");

				if ( newBarVal < 0 ) {
					newBarVal = 0;
				}
				
				if ( newBarVal <= 100 ) {
					$spanEl.css("width", newBarVal + "%");		
					$spanEl.removeClass("red");
				}
				else {
					$spanEl.css("width", "100%");
					$spanEl.addClass("red");
				}

				$spanEl.attr("data-value", newBarVal);
				$pEl.text(newBarVal + "%");
			});
		};

	return {
		init: function () {						
			_initBars();
			_bindEvents();
		}
	};
})(jQuery);	