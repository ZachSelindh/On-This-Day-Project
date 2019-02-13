

$(document).ready(function() {

  // initializes the settings for the datepicker
  $("#day-input").datepicker({
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    dateFormat: 'MM d'
  });

/* Javascript File for On This Day project */

$(document).on("click", "#search-button", function(){

  // takes the input from the datepicker and makes an api call to get the events
  var date = $("#day-input").val();
  var wikiUrl = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=1&page=" 
                + date 
                + "&callback=?";

	$.ajax({
	    type: "GET",
	    url: wikiUrl,
	    contentType: "application/json; charset=utf-8",
	    async: false,
	    dataType: "json",
	    success: function (data, textStatus, jqXHR) {
	    
		var markup = data.parse.text["*"];
		var i = $('<div></div>').html(markup);
		
		// remove links as they will not work
		i.find('a').each(function() { $(this).replaceWith($(this).html()); });
		
		// remove any references
		i.find('sup').remove();
		
		// remove cite error
		i.find('.mw-ext-cite-error').remove();

    // initial array to hold the events
		var events = [];
      $(i).find('li').each( function() { events.push($(this).text()); });
      $("#wiki-display").text(events[0]);
      console.log(events[0]);
    },
    error: function (errorMessage) {
    }
	});   

    // var searchTerm = $("#day-input").val();

    // var youTubeAPIKey = "AIzaSyDcWVbgXVAksO-kg0P9f7zjV-lkBcjNEdU";

    // var youTubeAPIURL = 
    //     "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + 
    //     "&type=video&videoCaption=closedCaption&key=" +
    //     youTubeAPIKey;

    // var historyWikiURL = "https://history.muffinlabs.com/date/" + searchTerm;

    // var historyTest = $.getJSON(historyWikiURL, function(){});

    // console.log(historyTest);
    
    // console.log(historyWikiURL);

    // console.log(youTubeAPIURL);

    // $.ajax({ // First request, calls Wikipeda API
    //     url: historyWikiURL,
    //     method: "GET"
    //   }).done(function(responseHist) {
          
            
            
    //   }),
    //   $.ajax({ // Second request, calls YouTube API
    //     url: youTubeAPIURL,
    //     method: "GET"
    //   }).done(function(responseTube) {
            
            
    //   });

});


});
