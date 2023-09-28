//step-2
var buttonColours = ["red", "blue", "green", "yellow"];
//step-2
var gamePattern = [];
//step-4
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("level-title").text("Game-Over,Press any key to restart");
    startOver();
  }
}

//userClickedPattern.push(userChosenColour);
//step-2
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level" + level);
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //step-3
  $("#" + randomChosenColour)
    .fadeIn("100")
    .fadeOut("100")
    .fadeIn("100");

  //step-3

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//step-4
