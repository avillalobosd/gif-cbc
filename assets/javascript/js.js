var nombreGif=["cat","dog","bird","crocodile"];
var revisar=1;
var numBoton=0;


function inicio(){

for (var i=0; i<nombreGif.length; i++){
var a = $("<button>");
a.addClass("button"+numBoton);
a.addClass("botonS btn btn-success");
a.attr("data-name", nombreGif[i]);
a.text(nombreGif[i]);
$(".botones").append(a);
numBoton++;
}}
inicio();

$(".botonAgregar").click(function(){
  if($(".nuevoAnimal").val()==""){
    
  }else {
  var a = $("<button>");
  a.addClass("button"+numBoton);
  a.addClass("botonS btn btn-success");
  a.attr("data-name", $(".nuevoAnimal").value);
  a.text($(".nuevoAnimal").val().trim());
  $(".botones").append(a);
  numBoton++;
  $(".nuevoAnimal").val("");}

});


$(document).on("click",".botonS",function() {
  var nextGif = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+nextGif+"&api_key=VrtzCO6UTsjq6GOcqusdOQxFzDczzGTx&limit=6s";
console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='col-2 gif-display'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.addClass("gif-show");
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-still", results[i].images.fixed_height_still.url);
        personImage.attr("data-animate", results[i].images.fixed_height.url);
        personImage.attr("data-state", "still")

        gifDiv.prepend(personImage);
        gifDiv.prepend(p);

        $(".gifs-aqui").prepend(gifDiv);
      }
    });

});

$(document).on("click",".gif-show", function() {

  if ($(this).attr("data-state")=="still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state","animate");

    
  }

   else if ($(this).attr("data-state")=="animate"){
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state","still");

    
  }
});