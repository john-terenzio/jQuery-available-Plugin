// jQuery available Plugin 1.6.1 (20101220)
// By John Terenzio | http://plugins.jquery.com/project/available | MIT License
(function($){

	// first we define some private variables
	var

		// this array will be the function queue
		// it will go like: [[selector1, function1, turbo1], [selector2, function2, turbo2]...]
		queue = [],

		// this is the polling interval, it can be checked, stopped, and restarted
		interval,

		// this function checks to see if an element is ready, and if so applies the corresponding function to it
		check = function(){

			// go through each row of the queue
			for (var i = 0; i < queue.length; i++) {

				// check if each selector's element is ready, we want to know if 0th index for the jQuery object is null or not (this is the actual element) 
				// if the element is not null, the opening tag is guaranteed to exist, but not necessarily the closing tag
				// so we also check for the next element, or isReady just in case it's the last element on the page
				// if turbo mode is used (list[i][2]), then we only check for the opening tag, this makes prepending or changing css "instant" on larger nodes
				if ($(queue[i][0])[0] && (queue[i][2] || $(queue[i][0]).next()[0] || $.isReady)) {

					// if the element is ready, apply the function within the context of the original selector
					// we only match the first element because otherwise we can't be sure if we got everything (if it's a class or tag name)
					// wrapping the apply in a try-catch will prevent a race condition if there is an error in the callback, and we'll log the error to console if it's there
					try {
						queue[i][1].apply($(queue[i][0]).eq(0));
					} catch (e) {
						if (typeof console != 'undefined') { console.log(e); }
					}

					// remove the finished row from the queue
					queue.splice(i, 1);

					// back up the counter by 1 so we don't skip the next item
					i--;
				}
			}

			// if the queue is empty, or the dom is ready (meaning element(s) weren't found), clear the interval so it doesn't run forever
			if (!queue.length || $.isReady) {
				interval = clearInterval(interval);
			}

		};

	// this is the public jQuery protoype method
	$.fn.available = function(fn, turbo){

		// default turbo to false
		turbo = turbo || false;

		// add the selector, the function, and whether or not turbo should be used to the queue
		queue.push([this.selector, fn, turbo]);

		// if the polling is not going, start it up and run it as fast as possible- 1ms delay
		// it won't really run 1000 times per second though, probably more like 10 depending on the environment
		if (!interval) {
			interval = setInterval(check, 1);
		}

		// allow for chaining
		return this;

	};

})(jQuery);