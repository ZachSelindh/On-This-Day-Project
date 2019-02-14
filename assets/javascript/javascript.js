$(document).ready(function() {

$(".content-cards").hide();

  /* Code to add the NASA image to the background */
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
  
  /* Datepicker activation */
$( function() {
  $("#datepicker").datepicker();
} );

  /* RNG for calling random events from Wiki API */
function randomNum(inputNum) {
  num = [Math.floor(Math.random() * inputNum)];
  return num;
}

  // initializes the settings for the datepicker
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    dateFormat: 'MM d'
  });

/* Javascript File for On This Day project */

$(document).on("click", "#search-button", function(){

  $("#wiki-display").empty();

  var searchTerm = $("#datepicker").val();

  console.log(searchTerm);

  // takes the input from the datepicker and makes an api call to get the events
  var date = $("#datepicker").val();
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
    
     /* Remove extraneous data from JSON information */
		i.find('a').each(function() { $(this).replaceWith($(this).html()); }); // Links
		i.find('sup').remove(); // References
		i.find('.mw-ext-cite-error').remove(); // Cite error

    // Initial array to hold the events
		var events = [];
      $(i).find('li').each( function() { events.push($(this).text()); });
      console.log("length = " + events.length)
        for (x=0; x < 10; x++) { 
          y = randomNum(events.length - 1);
          $("#wiki-display").append(events[y] + "<br><br>");
          console.log(events[x]);
          events.sort();
        }

      $(".content-cards").fadeIn(300);
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
