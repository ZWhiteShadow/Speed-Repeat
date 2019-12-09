var challangeArray = [];
var gamerTestArray = [];

function start() {
  challangeArray = [];
  gamerTestArray = [];
  nextRound();
}

function nextRound() {

  // don't let user click on anything
  document.getElementById('up').setAttribute( "onClick", "" );
  document.getElementById('left').setAttribute( "onClick", "" );
  document.getElementById('middle').setAttribute( "onClick", "" );
  document.getElementById('right').setAttribute( "onClick", "" );
  document.getElementById('down').setAttribute( "onClick", "" );
  document.getElementById('message').innerHTML= "Pay Close Attention!";
  var nextChallange = Math.floor(Math.random() * 5) + 1; // Randomly pick next challange up down left right or middle 5 options
  challangeArray.push(nextChallange);
  challangeTime(challangeArray);
}

function challangeTime(challangeArray) {
  for (i = 0; i < challangeArray.length; i++) {
    changeColor(challangeArray[i], 3000);
  }

  setTimeout(function(){
  document.getElementById('message').innerHTML= "Click Center First";
  document.getElementById('middle').setAttribute( "onClick", "answerTest()" );
}, 6000);
}

function answerTest(answerTest){
  setTimeout(function(){ document.getElementById('message').innerHTML= "Ok Now Copy What I Did"; }, 4000);

  document.getElementById('up').setAttribute( "onClick", "answerTest(1)" );
  document.getElementById('left').setAttribute( "onClick", "answerTest(2)" );
  document.getElementById('middle').setAttribute( "onClick", "answerTest(3)" );
  document.getElementById('right').setAttribute( "onClick", "answerTest(4)" );
  document.getElementById('down').setAttribute( "onClick", "answerTest(5)" );

changeColor(answerTest,1750);

}

function changeColor(num, wait) {
  var audio;

  if (num == 1) {
    audio = new Audio('a.wav');
    audio.play();
    document.getElementById("up").style.borderBottom = "9.375em solid darkred";
    setTimeout(function() {
      document.getElementById("up").style.borderBottom = "9.375em solid #FF2400";
    }, wait);
  }
  if (num == 2) {
    audio = new Audio('b.wav');
    audio.play();
    document.getElementById("left").style.borderRight = "9.375em solid chocolate";
    setTimeout(function() {
      document.getElementById("left").style.borderRight = "9.375em solid orange";
    }, wait);
  }
  if (num == 3) {
    audio = new Audio('c.wav');
    audio.play();
    document.getElementById("middle").style.backgroundColor = "#999900";
    setTimeout(function() {
      document.getElementById("middle").style.backgroundColor = "#FFF205";
    }, wait);
  }
  if (num == 4) {
    audio = new Audio('d.wav');
    audio.play();
    document.getElementById("right").style.borderLeft = "9.375em solid darkgreen";
    setTimeout(function() {
      document.getElementById("right").style.borderLeft = "9.375em solid #7CFF01";
    }, wait);
  }
  if (num == 5) {
    audio = new Audio('e.wav');
    audio.play();
    document.getElementById("down").style.borderTop = "9.375em solid darkblue";
    setTimeout(function() {
      document.getElementById("down").style.borderTop = "9.375em solid #01CFF4";
    }, wait);
  }
}
