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

$("#action-1").click( function() {
    $("#output-area").html("<p>action-1</p>");
});

$("#action-2").click( function() {
    $("#output-area").html("<p>action-2</p>");
});

$("#action-3").click( function() {
    $("#output-area").html("<p>action-3</p>");
});