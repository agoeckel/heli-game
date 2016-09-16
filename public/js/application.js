time = 0
game = 0
crashed = false
score = 0

function Rocket() {
  this.speed = Math.floor((Math.random() * 10));
  this.area = Math.floor((Math.random() * 800) + 1);
}

rounds = Math.floor((Math.random() * 10) + 8);

function createRockets(rounds){
  rockets = []
  for(var i=0; rounds > i; i++){
    rocket = new Rocket();
    rockets.push(rocket);
  }
  return rockets
}

function scoreTimer() {
  if (crashed === true) { return; }{
    score += 1
     $(".score").html("<div class='score'>score: "+score+"</div>")
   setTimeout(scoreTimer, 10);
  }
}

function highScoreCheck() {
  var currentHighScore = $(".high-score").text()
  console.log(currentHighScore)
  if(currentHighScore < score){
    var currentScore = score.toString()
    $(".high-score").text(score);
  $.ajax({
     url: "/",
     method: "POST",
     data: { score: currentScore }
   })
    .done(function(response){
    });
  }
}



function animation(id){
  rocketspeed = 700 * rockets[id].speed

  $("#"+id).animate({"right": "+=2000px"}, rocketspeed );
  var percent = 0;
  var pointer = setInterval(function() {
    if (percent >= 100) {
      clearInterval(pointer);
      rocket = document.getElementById(id)
      return;
    }
    $("#Status").text(percent);
      percent ++
      var element = document.getElementById(id);
      var style = window.getComputedStyle(element);
      var right = style.getPropertyValue("right")
      var marginTop = style.getPropertyValue("margin-top")
      var missile = parseInt(marginTop, 10)
      var top = missile + 50
      var bottom = missile - 50

    if((bottom < time) && (time < top) === true){
      if((parseInt(right, 10) >= 1000) && (parseInt(right, 10) <= 1040)){
        if(crashed === false){
          $("#box").html("<img src=img/explosion.gif-c200>")
          crashed = true
          highScoreCheck()
          window.setInterval(function(){
            $( "#dialog-confirm" ).dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                Restart: function() {
                  window.location.reload()
                }
              }
            });
          }, 1000);
          clearInterval(pointer);
          percent = 100
        }
      }
    }
  }, 30);
}

function timeBackward (){
  if (click === false || time === 0) { return; }
  time -= 3
  setTimeout(timeBackward, 1);
  $('#box').css('margin-top', time);
  $('#box').css('-webkit-transform', 'rotate(-7deg)')
}

function timeForward (){
  if (unClick === false || time >= window.innerHeight - 96 ) { return; }
    time += 3
  if(time === (window.innerHeight - 96)){
    if(crashed === false){
    $("#box").html("<img src=img/explosion.gif-c200>")
    crashed = true
    window.setInterval(function(){
    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
        Restart: function() {
          window.location.reload()
        }
       }
     });
    }, 1000);
   }
  }

  setTimeout(timeForward, 1);
  $('#box').css('margin-top', time);
  if (time >= window.innerHeight - 100 ){
    $('#box').css('-webkit-transform', 'rotate(0deg)');
  } else {
    $('#box').css('-webkit-transform', 'rotate(7deg)');
  };
};

$(document).ready(function(){

  window.setInterval(function(){
    $(".rocket").remove()
    createRockets(rounds);
    for (var i=0; i < rockets.length; i++){
      $(".missile").after("<div class=rocket " + 'id='+ i + " style=margin-top:"+ i * 100 + "px;right:" +  -100 + "px;><img src=img/missile.gif height=30></div>");
      animation(i);
    }
  }, 5000);

  marginTop = 0
  var mouseDown = []
  while((window.innerHeight - 100) > marginTop){
    $(window).mousedown(function(e){
      e.preventDefault();

      var mouseEvent = "mouseEvent"
      mouseDown.push(mouseEvent)

      if(mouseDown.length === 1){
        scoreTimer()
      }

      unClick = false;
      click = true;

      if(click === true){
        timeBackward();
      };
    });

    $(window).mouseup(function(e){
      e.preventDefault();
      click = false;
      unClick = true;
      if(unClick === true){
        timeForward();
      };
    });
    element = document.getElementById("box");
    style = window.getComputedStyle(element);
    marginTop = style.getPropertyValue("margin-top")
  }
});
