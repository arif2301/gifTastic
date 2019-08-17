$( document ).ready(function() {
  


console.log(" js file is loanded");
var topics = ["Toy Story", "Top Gear", "Go Pro", "Finding Nemo"];

var gifResult = [];

// Function for gif buttons
function addButtons() {
    // Deleting existing buttons
    $("#buttons-view").empty();
    // deleting previously displayed gifs
    $("#gifs-view").empty();

    // adding new buttons
    for (var i = 0; i < topics.length; i++) {
        var x = $("<button>");
        // class
        x.addClass("gif");
        // data-attribute 
        x.attr("data-name", topics[i]);
        // button text
        x.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(x);
    }
}

// function handles events where one button is clicked
$("#add-gif").on("click", function(event) {
    // to avoid form from submitting
    event.preventDefault();

    // adding new query into the gifs array
    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    addButtons();
});

addButtons();

function callGif() {

    // deleting previously displayed gifs
    $("#gifs-view").empty();
    var topic = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=TAUEmG8XELuVn6145E8v2Id4wyP8yB0U&limit=10";

    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(topic);
    console.log(queryURL);

        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div class=col-md-4>");
            //gifDiv.addClass("gifclick");

            // Storing the result item's rating
            var rating = results[i].rating;

            //  paragraph tag with the item's rating
            var p = $("<p>").text("Rating: " + rating);

            // image tag
            var image = $("<img>");
            //image.attr("src", results[i].images.fixed_height.url);
            //fixed_height_still

            var animate = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            
            image.attr("src", still);

            image.attr("data-animate", animate);
            image.attr("data-still", still);
            image.attr("data-state", "still");
            image.addClass("gifclick");

            // add it to the object
            gifDiv.append(p);
            gifDiv.append(image);

            // display
            $("#gifs-view").prepend(gifDiv);
        }
        }
    });
}

// gif button click event 
$(document).on("click", ".gif", callGif);

// for pause and play
$(document).on("click", ".gifclick",  function() {
    
    var state = $(this).attr("data-state");
    console.log (state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log ("if");
    } 
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log ("else");
    }
});

});
