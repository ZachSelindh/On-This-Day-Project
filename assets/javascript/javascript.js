

$(document).ready(function() {

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

    var youTubeAPIKey = "AIzaSyDcWVbgXVAksO-kg0P9f7zjV-lkBcjNEdU";

    var youTubeAPIURL = 
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + 
        "&type=video&videoCaption=closedCaption&key=" +
        youTubeAPIKey;

    var historyWikiURL = "https://history.muffinlabs.com/date/" + searchTerm;

    var historyTest = $.getJSON(historyWikiURL, function(){});

    console.log(historyTest);
    
    console.log(historyWikiURL);

    console.log(youTubeAPIURL);

    $.ajax({ // First request, calls Wikipeda API
        url: historyWikiURL,
        method: "GET"
      }).done(function(responseHist) {
          
            
            
      }),
      $.ajax({ // Second request, calls YouTube API
        url: youTubeAPIURL,
        method: "GET"
      }).done(function(responseTube) {
            
            
      });

});


});
