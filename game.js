 var count=0;
 var level=0;
 var started=false;
 var gamePattern=[];
 var userClickedPattern=[];
 var buttonColours =["red", "blue", "green", "yellow"];

 $(document).keypress(function() {

 count=count+1;
 if (count===1) {
   $("#level-title").text("Level "+level);
   nextSequence();
  }
 });

 $(".btn").click(function() {
   var userChosenColour =this.id;
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
   });


 function nextSequence() {
   userClickedPattern.length=0;
   level=level+1;
   $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }

    function playSound(name) {
      var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
    }

 function animatePress(currentColour) {
   $("#"+currentColour).addClass("pressed");
   setTimeout(function() {
     $("#"+currentColour).removeClass("pressed");
   },100);
 }


 function checkAnswer(currentLevel) {
   if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
     if (userClickedPattern.length===gamePattern.length) {
       setTimeout(function() {
         nextSequence();
       },1000);
       }

   }
   else {

      if (count!==0) {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        count=0;
        level=0;
        gamePattern=[];
      }
   }
 }
