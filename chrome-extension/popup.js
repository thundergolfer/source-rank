document.addEventListener('DOMContentLoaded', function () {
  /* Get the rating data for the current tab */
  const rating = chrome.extension.getBackgroundPage().getCurrentTabRating();

  console.log( rating );

  if ( !rating ) {
    $("body").css( "background", "#FFF" );
    $("#results").hide();
    $("#loading").show();
    $("#not-an-article").hide();
    return;
  }

  if ( !rating.valid ) {
    $("body").css( "background", "#FFF" );
    $("#results").hide();
    $("#loading").hide();
    $("#not-an-article").show();
    $("body, html").css( "height", 200 );
    return;
  }

  $("#not-an-article").hide();
  $("#results").show();
  $("#loading").hide();

  /* Get the numerical rating value */
  const ratingValue = rating.num_rating;
  $("#rating").html( rating.num_rating );
  $("#rating-text").html( rating.str_rating );

  /* Calculate the colour to set the background */
  let color = "#2ecc71"; /* Green */

  if ( ratingValue < 8 ) {
    color = "#f39c12"; /* Orange */
  }

  if ( ratingValue < 5 ) {
    color = "#e74c3c"; /* Red */
  }

  $("body").css( "background", color );
});
