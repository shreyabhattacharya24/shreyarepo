var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    started=true;
    //highlight a button randomly
      $("body").removeClass("game-over");
    nextSequence();
  }
});


$(".btn").click(function() {

var userChosenColour=$(this).attr("id");
userClickedPattern.push(userChosenColour);
console.log("user: "+userClickedPattern);
animateEffect(userChosenColour);
playMusic(userChosenColour);
checkAnswer(userClickedPattern.length);
});











function nextSequence(){
  userClickedPattern=[];
    level++;
      $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];


  gamePattern.push(randomChosenColour);
  console.log("game: "+gamePattern);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playMusic(randomChosenColour);

}


function animateEffect(userChosenColour){


$("#"+userChosenColour).addClass("pressed");
setTimeout(function(){$("#"+userChosenColour).removeClass("pressed");},100);
playMusic(userChosenColour);
}

function playMusic(randomChosenColour){
  var audio=new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1]){

    console.log("success");

if(gamePattern.length===userClickedPattern.length){
  setTimeout(function(){nextSequence();},1000);
}
}
else{wrongInput();}

}


function wrongInput(){
  $("body").addClass("game-over");
  setTimeout(function(){playMusic("wrong")},200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;

}
