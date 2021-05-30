// hoda
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// keypress detect
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});


// handler function to click button

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
// call play sound and aniamtion on pressed color
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});


// check answers function
function checkAnswer(currentLevel) {
  // PA two if staement inside eachother
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
// game over
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function nextSequence() {
  // empty user array for next level
  userClickedPattern = [];
  // increase level title
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // flash animate for seleted button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // play sound func with selected button
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}
// second function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// animation function with timeout
function animatePress(currentColour) {
  $("btn" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("btn" + currentColour).removeClass("pressed");
  }, 100);

}
// start over function
function startOver(){
 level = 0;
 gamePattern = [];
 started = false;
}
