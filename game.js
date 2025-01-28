var count = 0;
var gamePattern = [];
var userPattern = [];
var started = false;


function randomColor(){
    var randArray = ["green", "red", "yellow", "blue"];
    var num = Math.round(Math.random()*3);
    return randArray[num];
}


function soundPlay(btnKey){
    var sound = new Audio("sounds\\"+ btnKey +".mp3");
    sound.play();            
}

function highlightBtn(btnKey){
    $("#"+btnKey).addClass("pressed");
    setTimeout(function(){
        $("#"+btnKey).removeClass("pressed");
    }, 100);

}


$(".btn").on("click", function(){
    var btnClicked = $(this).attr("id");
    userPattern.push(btnClicked);
    highlightBtn(btnClicked);
    soundPlay(btnClicked);
    
    checkAnswer(userPattern.length-1);
    
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          sequence();
        }, 1000);
      }
    } else {
      soundPlay("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

$(".start").on("click", function(){
  if (!started){
    document.querySelector(".start").classList.add("hide");
    $("h1").text("Level "+ count);
    sequence();
    started = true;
}
});

document.addEventListener("keydown", function(){
    if (!started){
        $("h1").text("Level "+ count);
        sequence();
        started = true;
    }

});

function startOver() {
    count = 0;
    gamePattern = [];
    started = false;
    document.querySelector(".start").classList.remove("hide");
  }

function sequence(){
    userPattern = [];
    var color = randomColor();
    console.log(color);
    highlightBtn(color);
    soundPlay(color);                
    gamePattern.push(color);
    


    count ++;
    $("h1").text("Level "+ count);

}