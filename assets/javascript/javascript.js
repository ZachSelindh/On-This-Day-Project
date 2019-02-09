/* Javascript File for On This Day project */

window.onload = function() {

$("$search-button").on("click", function(){

  var searchYT = $("#date-input").attr("data-attribute");

  var youTubeAPIKey = "AIzaSyDcWVbgXVAksO-kg0P9f7zjV-lkBcjNEdU";

  var youTubeAPIURL = 
  "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchYT + 
  "&type=video&videoCaption=closedCaption&key=" + youTubeAPIKey;

  var searchWiki = $("#date-input").attr("data-attribute");

  var wikiURL = "/assets/json/" + searchWiki;

  console.log("searchWiki = " + searchWiki);  

  console.log("searchYT = " + searchYT);  

  console.log("YoutubeURL=" + youTubeAPIURL); 

    $.ajax({ // API request, calls Youtube API
        url: youtTubeAPIURL,
        method: "GET"
      }).done(function(responseYT) {
          /* Youtube API info */
            
            
      }),
    $.ajax({ // API request, calls Wikipeda JSON files
        url: wikiURL,
        method: "GET"
      }).done(function(responseWiki) {
          /* Youtube API info */
      });
});

}