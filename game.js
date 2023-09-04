var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  level += 1;
  //   $("h1").text("Level " + level);
  return randomNumber;
}

var randomChosenColour = buttonColours[nextSequence()];

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

var hasKeyDownOccurred = false;

$(document).keydown(function () {
  if (!hasKeyDownOccurred) {
    $("#" + randomChosenColour)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColour);

    gamePattern.push(randomChosenColour);

    $("h1").text("Level " + level);

    hasKeyDownOccurred = true;
  }
});

$(".btn").on("click", function () {
  var $this = $(this);

  //play Sound + animate pressed
  playSound($this.attr("id"));
  $(this).addClass("pressed");
  setTimeout(function () {
    $this.removeClass("pressed");
  }, 100);

  userClickedPattern.push($this.attr("id"));

  // Überprüfen, ob der aktuelle Klick mit dem entsprechenden Muster im Spiel übereinstimmt
  if (
    userClickedPattern[userClickedPattern.length - 1] !==
    gamePattern[userClickedPattern.length - 1]
  ) {
    console.log("userClickedPattern != gamePattern");
    $("h1").text("Game Over! Press A Key To Start Again!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //neue Runde
    $(document).keydown(function () {
      userClickedPattern = [];
      gamePattern = [];
      level = 0;
      nextSequence();

      $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);
      playSound(randomChosenColour);

      gamePattern.push(randomChosenColour);

      $("h1").text("Level " + level);
    });
  } else {
    // Überprüfen, ob der Benutzer das gesamte Muster richtig abgeschlossen hat
    if (userClickedPattern.length === gamePattern.length) {
      // Hier fügen Sie den Code hinzu, um fortzufahren, wenn der Benutzer das Muster richtig abgeschlossen hat.
      userClickedPattern = [];
      randomChosenColour = buttonColours[nextSequence()];
      gamePattern.push(randomChosenColour);
      $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);

      $("h1").text("Level " + level);
    }
  }
});
