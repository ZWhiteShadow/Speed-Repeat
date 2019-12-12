var challangeArray, gamerTestArray, testNum, 
score, t0, t1, betterScore, speed, waitTime;
const bonus = 1.1;

function start() {
  document.getElementById('title').innerHTML = "Speed Repeat";
  challangeArray = [];
  gamerTestArray = [];
  score = 0;
  betterScore = 0;
  waitTime = 0;
  document.getElementById('message2').innerHTML = "Your Score: " + betterScore;
  document.getElementById('message3').innerHTML = "Round: " + score;
  nextRound();
}

function clearClick() {
  // don't let user click on anything
  document.getElementById('up').removeAttribute("onclick");
  document.getElementById('left').removeAttribute("onclick");
  document.getElementById('right').removeAttribute("onclick");
  document.getElementById('down').removeAttribute("onclick");
  document.getElementById('middle').removeAttribute("onclick");
}

function displayChallange() {
  //  https://borgs.cybrilla.com/tils/javascript-for-loop-with-delay-in-each-iteration-using-iife/
  for (var i = 0; i < challangeArray.length; i++) {
    (function (i) {
      setTimeout(function () {
        speed = (i < 40) ? (2000 - (50 * i)) : 0;
        waitTime += speed;
        changeColor(challangeArray[i], 500);
      }, (150 + speed) * i);
    })(i);
  };

}

function nextRound() {
  clearClick();
  gamerTestArray = [];
  testNum = 0;
  score += 1;
  document.getElementById('message3').innerHTML = "Round: " + score;
  document.getElementById('message').innerHTML = "Pay Close Attention!";
  var nextChallange = Math.floor(Math.random() * 5) + 1; // Randomly pick next challange up down left right or middle 5 options
  challangeArray.push(nextChallange);

  displayChallange();

  setTimeout(function () {
    document.getElementById('message').innerHTML = "Ok Now Copy What I Did";
    document.getElementById('up').setAttribute("onClick", "answerTest(1)");
    document.getElementById('left').setAttribute("onClick", "answerTest(2)");
    document.getElementById('middle').setAttribute("onClick", "answerTest(3)");
    document.getElementById('right').setAttribute("onClick", "answerTest(4)");
    document.getElementById('down').setAttribute("onClick", "answerTest(5)");

  }, (waitTime + 2000));
  t0 = performance.now();
}

function answerTest(answerTest) {

  gamerTestArray.push(answerTest);

  if (gamerTestArray[testNum] == challangeArray[testNum]) {

    changeColor(answerTest, 500);
    testNum += 1;
    t1 = performance.now();
    betterScore += ((335 / (t1 - t0)) * 100);
    document.getElementById('message2').innerHTML = "Your Score: " + Math.floor(betterScore).toLocaleString();
    t0 = performance.now();

    if (gamerTestArray.length == challangeArray.length) {
      betterScore *= bonus;

      if ((score % 5 == 0) && score != 0) {
        setTimeout(function () {
          audio = new Audio('tada.wav');
          audio.play();
        }, 500);
      }
      document.getElementById('message2').innerHTML = "Your Score: " + Math.floor(betterScore).toLocaleString();
      clearClick();
      setTimeout(function () {
        nextRound();
        waitTime = 0;
      }, 3500);
    }

  } else {
    clearClick();
    var audio;
    audio = new Audio('wrong.wav');
    audio.play();
    document.getElementById('title').innerHTML = "GAME OVER!";
    document.getElementById('message').innerHTML = "Click Center to Play Again";
    document.getElementById('middle').setAttribute("onClick", "start()");
    return;
  }

}

function changeColor(num, wait) {

  if (num == 1) {

    audio = new Audio('a.wav');
    audio.play();
    document.getElementById("up").style.borderBottom = "9.375em solid darkred";
    setTimeout(function () {
      document.getElementById("up").style.borderBottom = "9.375em solid #FF2400";
    }, wait);
  }
  if (num == 2) {

    audio = new Audio('b.wav');
    audio.play();
    document.getElementById("left").style.borderRight = "9.375em solid chocolate";
    setTimeout(function () {
      document.getElementById("left").style.borderRight = "9.375em solid orange";
    }, wait);
  }
  if (num == 3) {

    audio = new Audio('c.wav');
    audio.play();
    document.getElementById("middle").style.backgroundColor = "#999900";
    setTimeout(function () {
      document.getElementById("middle").style.backgroundColor = "#FFF205";
    }, wait);
  }
  if (num == 4) {

    audio = new Audio('d.wav');
    audio.play();
    document.getElementById("right").style.borderLeft = "9.375em solid darkgreen";
    setTimeout(function () {
      document.getElementById("right").style.borderLeft = "9.375em solid #7CFF01";
    }, wait);
  }
  if (num == 5) {

    audio = new Audio('e.wav');
    audio.play();
    document.getElementById("down").style.borderTop = "9.375em solid darkblue";
    setTimeout(function () {
      document.getElementById("down").style.borderTop = "9.375em solid #01CFF4";
    }, wait);
  }
}