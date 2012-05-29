(function($) {

	$.fn.jbslider = function(options) {
		
		var opts = $.extend({}, $.fn.jbslider.defaults, options);
	
    	return this.each(function() {
			
			var container = $(this);	
			var nbElem = $('li', container).length;
			container.wrap('<div id="' + opts.id + '" />');    		
    		var wrapper = $('#' + opts.id);
    		var currentPosition = 0;
    		    		
    		container.css('width', (opts.width * nbElem));
    		container.css('height', opts.height);
    		container.css('margin', 0);
    		container.css('padding', 0);
    		$('li', container).css('width', opts.width);
    		$('li', container).css('height', opts.height);
    		$('li', container).css('float', 'left');
    		$('li', container).css('margin', 0);
			wrapper.css('width', opts.width);
			wrapper.css('overflow', 'hidden');
    		
    		wrapper.append('<nav class="controls"><a href="#" class="previous">Previous</a><a href="#" class="next">Next</a></nav>');
    		
    		var movePane = function(position) {
    			var marginLeft = -(position * opts.width);
				var oldPosition = currentPosition;
    			container.animate({
    			    marginLeft: marginLeft
	    		}, opts.speed, function() {
	    			$('li:eq(' + oldPosition + ') iframe', container).each(function() {
				 		$(this).attr('src', $(this).attr('src'));	
					});
	    		});
    			currentPosition = position;
    			$('.pagination li', wrapper).removeClass('current');
    			$('.pagination li:eq(' + currentPosition + ')', wrapper).addClass('current');
    			$('li:eq(' + currentPosition + ') iframe', container).show();
    		};
    		
    		var nextClick = function() {
    			$('.next', wrapper).click(function() {
    				var position = currentPosition + 1;
    				if(position == nbElem) {
    					position = 0;
    				}
    				movePane(position);
    				return false;
    			});
    		};
    		
    		var previousClick = function() {
    			$('.previous', wrapper).click(function() {
    				var position = currentPosition - 1;
    				if(position == -1) {
    					position = nbElem - 1;
    				}
    				movePane(position);
    				return false;
    			});
    		};

    		nextClick();
    		previousClick();
    		
    		if(opts.pagination == true) {
    			var htmlPagination = '<ul class="pagination">';
    			for(var i = 0 ; i < nbElem ; i++) {
    				htmlPagination = htmlPagination + '<li><a href="#" data-position="' + i + '">' + (i + 1) + '</a></li>';
    			}
    			htmlPagination = htmlPagination + '</ul>';
    			$('.controls .next', wrapper).before(htmlPagination);
    			$('.pagination li:eq(' + currentPosition + ')', wrapper).addClass('current');
    			var paginationClick = function() {
    				$('.pagination li a', wrapper).click(function() {
    					movePane($(this).data('position'));
    					return false;
    				});
    			};
    			paginationClick();
    		}
    		
    	});
    }
    
    //Default configuration
  	$.fn.jbslider.defaults = {
  		id: 'jbSliderWrapper',
  		width: 750,
  		height: 300,
  		speed: 500,
  		pagination: false
  	}

    	
})(jQuery);