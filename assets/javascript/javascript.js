$(document).ready(function() {

  var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=kgJtPslniAUmqh8Q2v2AYwNqg3hhNTyijqwre8oD";

  $.ajax({
    url: nasaURL,
    success: function(result){
      console.log(result);
    if("copyright" in result) {
      $("#copyright").text("Image Credits: " + result.copyright);
    }
    else {
      $("#copyright").text("Image Credits: " + "Public Domain");
    }
    
    if(result.media_type == "video") {
      $("#apod_img_id").css("display", "none"); 
      $("#apod_vid_id").attr("src", result.url);
    }
    else {
      $("#apod_vid_id").css("display", "none"); 
      $("#apod_img_id").attr("src", result.url);
    }
    document.body.style.backgroundImage = "url('" + result.url + "')";
  }
  });
  

var listItems = [   'february-14', 
                  'february-20', 
                  'february-29', 
                  'march-3',
                  'april-1',
                  'june-21',
                  'july15',
                  'nov-20',
                  'december-7'];

for (let x in listItems) {
    var anItem = "<div id='item-" + x + "' class='dropdown-item' data-json='assets/json/" + listItems[x] + ".json'>" + listItems[x] + "</div>";
    $("#list-date").append(anItem);
    $("#item-" + x).click( function() {
        console.log($("#item-" + x).data("json"));
    });
}

  // $("#day-input").datepicker({
  //   changeMonth: true,
  //   changeYear: true,
  //   showButtonPanel: true,
  //   dateFormat: 'MM dd'
  // });
/* Javascript File for On This Day project */


$(document).on("click", "#add-day", function(){

    var searchTerm = $("#day-input").val();
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

});
