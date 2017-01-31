/* ==========================================================================
   JS
   ========================================================================== */

var $ = require( 'jquery' );
require( 'cf-expandables' );
require( 'cf-tables' );
require( 'lunr' );

$(document).ready(function() {
  'use strict';
  $('.cf-icon-external-link').append('<span class="u-visually-hidden"> Links to external site.</span>');
});


// SEARCH.JS

//Create a module using an IIFE

;(function(global,$) {
  /*
    Put ourselves into "strict" mode
    This just helps us write cleaner JavaScript
  */
  'use strict';

  Query.prototype = {
    // this.q is our search query (for example, "javascript tutorial")
    set: function(val) {
      this.q = val;
      return this;
    },
    // brings us to our search page with a query string attached
    goToLocation: function(route) {
      if(typeof this.q !== 'undefined' && typeof this.q === 'string') {
        document.location.href=route+'/?query='+this.q;
      } else {
        return;
      }
    },
    // returns our search query (for example, "javascript tutorial")
    get: function() {
      return this.q;
    },
    // "grab" the query from the query string in the URL and set this.q to it
    setFromURL: function(name) {
      console.log('in setFromURL(' + name + ')');
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);

      console.log('setFromURL regex results:');
      console.log(results);

      this.q = results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

      console.log(this);
      console.log(this.q);

      return this;
    },
    // a wrapper for jQuery's $.get
    getJSON: function(file) {
      return $.get(file);
    }
  };

  // when we initialize a query, we have the option of giving it a query string
  function Query(q) {
    if(typeof q !== 'undefined' && typeof q === 'string') {
      this.q = q;
    }
  }

  // attach the Query object to the window
  window.Query = Query;
  console.log('global Query attached');
})(this,$);


$(function(Query) {
	'use strict';

  console.log('in setup function');

	var query = new Query();

	$('.search').on('submit',submit);

	function submit(e) {
		// stop the form from doing its default behavior
		e.preventDefault();

		// set the query, and go to the search page with our query URL
		query
		.set($('.search-box').val().trim())
		.goToLocation('/design-manual/search');
	}
}(Query));
