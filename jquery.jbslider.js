(function($) {

	$.fn.jbslider = function(options) {
		
		var opts = $.extend({}, $.fn.jbslider.defaults, options);
	
    	return this.each(function() {
			
			var container = $(this);	
			var nbElem = $('li', container).length;
			container.wrap('<div id="' + opts.id + '" class="carousel" />');    		
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
    		$('li:eq(0)', container).addClass('current');
    		
    		wrapper.append('<nav class="controls"><a href="#" class="previous">Previous</a><a href="#" class="next">Next</a></nav>');
    		
    		var movePane = function(position, iframeReset) {
    			var marginLeft = -(position * opts.width);
				var oldPosition = currentPosition;
    			container.animate({
    			    marginLeft: marginLeft
	    		}, opts.speed, function() {
	    			if(iframeReset) {
	    				$('li:eq(' + oldPosition + ') iframe', container).each(function() { $(this).attr('src', $(this).attr('src')); });
	    			}
	    		});
    			currentPosition = position;
    			if(opts.pagination == true) {
 		   			$('.pagination li', wrapper).removeClass('current');
    				$('.pagination li:eq(' + currentPosition + ')', wrapper).addClass('current');
    			}
    			$('li', container).removeClass('current');
    			$('li:eq(' + currentPosition + ')', container).addClass('current');
    		};
    		
    		var nextClick = function() {
    			$('.next', wrapper).click(function() {
    				var position = $('li.current', container).index() + 1;
    				if(position == nbElem) {
    					position = 0;
    				}
    				movePane(position, true);
    				if(opts.autoPlayTime > 0) { mouseOver = true; }
    				return false;
    			});
    		};
    		
    		var previousClick = function() {
    			$('.previous', wrapper).click(function() {
    				var position = $('li.current', container).index() - 1;
    				if(position == -1) {
    					position = nbElem - 1;
    				}
    				movePane(position, true);
    				if(opts.autoPlayTime > 0) { mouseOver = true; }
    				return false;
    			});
    		};

    		nextClick();
    		previousClick();
    		
    		if(opts.arrowControl == true) {
    			function handleArrowKeys(evt) {
				    evt = (evt) ? evt : ((window.event) ? event : null);
				    if (evt) {
				    	var position = $('li.current', container).index();
				        var max = $('li', container).length;
				        switch (evt.keyCode) {
				            case 37:
				                if(position == 0) {
				                	movePane(max - 1, true);
				                } else {
				                	movePane(position - 1, true);
				                }
				                if(opts.autoPlayTime > 0) { mouseOver = true; }
				                break;    
				            case 39:
				                if((position + 1) >= max) {
				                	movePane(0);	
				                } else {
				                	movePane(position + 1, true);
				                }
				                if(opts.autoPlayTime > 0) { mouseOver = true; }
				                break;    
				         }
				    }
				}
				document.onkeyup = handleArrowKeys;
			}
			
    		
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
    					movePane($(this).data('position'), true);
    					if(opts.autoPlayTime > 0) { mouseOver = true; }
    					return false;
    				});
    			};
    			paginationClick();
    		}
    		
    		if(opts.autoPlayTime > 0) {
    			var mouseOver = false;
    			setInterval(function() {
    				if(mouseOver == false) {
    					currentPosition = currentPosition + 1;
    					if(currentPosition >= nbElem) {
    						currentPosition = 0;
    					}
    					movePane(currentPosition, false);
    				}
    			}, opts.autoPlayTime);    			
    			container.mouseenter(function() {
    				mouseOver = true;
    			});
    			
    		}
    		    		
    	});
    }
    
    //Default configuration
  	$.fn.jbslider.defaults = {
  		id: 'jbSliderWrapper',
  		width: 750,
  		height: 300,
  		speed: 500,
  		pagination: false,
  		arrowControl: true,
  		autoPlayTime: 0
  	}

})(jQuery);