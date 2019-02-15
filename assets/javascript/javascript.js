$(document).ready(function() {

  $(".content-cards").hide();
  
    /* Code to add the NASA image to the background */
  var nasaURL = "https://api.nasa.gov/planetary/apod?api_key=kgJtPslniAUmqh8Q2v2AYwNqg3hhNTyijqwre8oD";
  
  $.ajax({
    url: nasaURL,
    success: function(result){
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
  
    // initializes the settings for the datepicker
    $("#datepicker").datepicker({
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      dateFormat: 'MM d',
      onSelect: function(dateText) {
        $("#wiki-display").empty();
  
        // takes the input from the datepicker and makes an api call to get the events
        var date = $("#datepicker").val();
    
        var wikiUrl = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=1&page=" 
                      + date 
                      + "&callback=?";
        /* var youTubeAPIKey = "AIzaSyDcWVbgXVAksO-kg0P9f7zjV-lkBcjNEdU"; */
        
        var youTubeAPIKey = "AIzaSyBYKeaoqwbR_th_gOH95rJSVUYkxqs6fHg";
    
        var searchYT = date.replace(" ", "+");
    
        var youTubeAPIURL =
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=history+" + searchYT + 
        "&type=video&videoCaption=closedCaption&min=1&list=videos&maxResults=5&key=" + youTubeAPIKey;
    
        /* AJAX call for Wikipeda API */
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
              for (x=0; x < (events.length -3); x++) { 
                $("#wiki-display").append(events[x] + "<br><br>");
              }
      
              // Fade in the cards to show the populated data.
            $(".content-cards").fadeIn(300);
          },
          error: function (errorMessage) {
          }
        });  
    
        /* AJAX call for Youtube API */
        $.ajax({
          url: youTubeAPIURL,
          method: "GET"
      }).done(function(responseYT) {
        console.log(responseYT);
        var videoIdEmbed = responseYT.items[0].id.videoId;
        var titleEmbed = responseYT.items[0].snippet.title;
        var srcYT = "https://www.youtube.com/embed/" + videoIdEmbed;
        $("#youtube-embed").attr("src", srcYT);
          $("#youtube-title").text(titleEmbed);
        })
      }
    });
   
  });