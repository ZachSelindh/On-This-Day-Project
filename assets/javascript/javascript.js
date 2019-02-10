

$(document).ready(function() {

// array of objects that contain a viewer friendly date and a filename date

var listItems = [ {display : 'February 14th', filename : 'february-14'},
                  {display : 'February 20th', filename :'february-20'},
                  {display : 'February 29th', filename :'february-29'}, 
                  {display : 'March 3rd', filename : 'march-3'},
                  {display : 'April 1st', filename : 'april-1'},
                  {display : 'June 21st', filename : 'june-21'},
                  {display : 'July 15th', filename : 'july15'},
                  {display : 'November 20th', filename : 'nov-20'},
                  {display : 'December 7th', filename :'december-7'}];

for (let x in listItems) {
    var anItem = "<div id='item-" + x + "' class='dropdown-item' data-json='assets/json/" + listItems[x].filename + ".json'>" + listItems[x].display + "</div>";
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
