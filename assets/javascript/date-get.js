function getEvents(dateInput) {
    var date = dateInput;
    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=1&page=" 
                    + dateInput 
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

		var events = [];
		
		// $('#article').html($(i).find('li'));
		// console.log($(i).find('li').html());
        $(i).find('li').each( function() { events.push($(this).text()); });
        $("#article").text(events[3]);
        //console.log(events[27]);
        // return events[1];

		
			
		
	    },
	    error: function (errorMessage) {
	    }
	});   

}