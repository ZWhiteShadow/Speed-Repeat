 var challangeArray, //corect answers
   gamerTestArray, //gamers answers
   testNum, // where answers are in each array 
   round, // what round the user is on
   t0, t1, // counters used for scoring
   betterScore, // total score displayed for user
   speed, // how long before each challange is displayed
   waitTime, // time before allowing user to try the challange
   scoreArray; //Stores gamers scores
   playerArray = []; // Save player scores
   roundArray = []; // Save player rounds high scores
   scoreArray = []; // Save Player scores

playerArray = [];
roundArray = [];
 for (i = 0; i < 13; i++) {
   playerArray.push("NPC"); //Fills Payer name Column on Table with NPC
   roundArray.push("NA"); //Fills Round Column  on Table with NA
 }

//Creates an Array to save scores

 //randomly add scores scores to scoreArray done only once
 (() => {
   for (let i = 0; i < 13; i++) {
     scoreArray.push(Math.floor(Math.random() * 8142));
   }
 })()

 //Sort and fill table
 function fillTable(playerName, playerRound, playerScore, ) {
   //add players score to stable
   scoreArray.push(playerScore);
   //sort score in descending order
   scoreArray.sort((a, b) => b - a);

   //add player name and round to places in table next to score
   roundArray.splice(scoreArray.indexOf(playerScore), 0, playerRound);
   playerArray.splice(scoreArray.indexOf(playerScore), 0, playerName);

   //remove The last score so it doesn't grow forever
   scoreArray.pop();
   roundArray.pop();
   playerArray.pop();

   //re-display all other data
   for (let i = 0; i < 13; i++) {
     document.getElementById("" + i + 0).innerHTML = playerArray[i].toLocaleString()
     document.getElementById("" + i + 1).innerHTML = roundArray[i].toLocaleString()
     document.getElementById("" + i + 2).innerHTML = scoreArray[i].toLocaleString()
   }
 }

 //call table first time add son's highest score!
 fillTable("Maho", 14, 8142);

 function start() { //runds with first click at start of game // and last click on center at end of game
   document.getElementById('title').innerHTML = "Speed Repeat"; // Change back title from game over

   //reset values or establish if first game
   challangeArray = [];
   gamerTestArray = [];
   round = 0;
   betterScore = 0;
   waitTime = 0;
   bonus = 1;

   //reset messages
   document.getElementById('message2').innerHTML = "Your Score: " + betterScore;
   // document.getElementById('message3').innerHTML = "Round: " + round;

   // Start the first round of the new game
   nextRound();
 }

 // don't let user click on anything
 function clearClick() {

   //clears each individual so user cannot 
   //click on anything while challange is being presented
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

         //speed up by 1/10 0f a second each time for the first 15 rounds
         speed = (i < 10) ? (1000 - (100 * i)) : 0;
         //determine how long to wait to change message to "Ok Now Copy What I Did"
         waitTime += speed;
         //visualy show color change
         changeColor(challangeArray[i], 250);
         // min .35 and ques sounds and change to be in i
         // intevals Example (1,2,3,4,5 seconds out) so 
         // they don't all hapen at the exact same time
       }, (350 + speed) * i);
     })(i);
   };

 }

 //starts the next round
 function nextRound() {
   clearClick(); //keeps user from clicking on anyting
   gamerTestArray = []; //this is the a list of what the gamer has chosen
   testNum = 0; // a counter to test speed for score
   round += 1; //counter for the next round

   //update messages

   document.getElementById('message3').innerHTML = "Round: " + round;
   document.getElementById('message').innerHTML = "Pay Close Attention!";

   // Randomly pick next challange up down left right or middle 5 options
   var nextChallange = Math.floor(Math.random() * 5) + 1;
   // Addd to the array containing the correct answers
   challangeArray.push(nextChallange);

   //cycle thru the correct sequence with delays
   displayChallange();

   // don't let user click on anything until the correct sequence has been displayed
   setTimeout(function () {
     document.getElementById('message').innerHTML = "Ok Now Copy What I Did";
     document.getElementById('up').setAttribute("onClick", "answerTest(1)");
     document.getElementById('left').setAttribute("onClick", "answerTest(2)");
     document.getElementById('middle').setAttribute("onClick", "answerTest(3)");
     document.getElementById('right').setAttribute("onClick", "answerTest(4)");
     document.getElementById('down').setAttribute("onClick", "answerTest(5)");
   }, (waitTime + 1500));
   t0 = performance.now(); //starts score timer
 }

 // passes in what gamer clicked on as 1-5
 function answerTest(answerTest) {
   //adds that to the answer array
   gamerTestArray.push(answerTest);

   //did the gamer pick the right answer? 
   if (gamerTestArray[testNum] == challangeArray[testNum]) {

     //visualy change color
     changeColor(answerTest, 250);
     //go to the next array index for challangeArray & gamerTestArray
     testNum += 1;
     // End counter for scoring
     t1 = performance.now();
     //Add to the score
     betterScore += ((335 / (t1 - t0)) * 100);
     //Display new score
     document.getElementById('message2').innerHTML = "Your Score: " + Math.floor(betterScore).toLocaleString();

     //Start counter over
     t0 = performance.now();

     // if the whole round is correct:
     if (gamerTestArray.length == challangeArray.length) {

       //Add Score to Table
       fillTable(document.getElementById('highscore').value == "" ? "Player" : document.getElementById('highscore').value, round, Math.floor(betterScore));
       //Show score
       document.getElementById('message2').innerHTML = "Your Score: " + Math.floor(betterScore).toLocaleString();

       //Every 5 rounds play a "tada" sound
       if ((round % 5 == 0) && round != 0) {
         setTimeout(function () {
           audio = new Audio('tada.wav');
           audio.play();
         }, 500);
       }

       //Keep user from clicking on any options
       clearClick();

       //wait 3.5 secods before starting next round
       setTimeout(function () {
         nextRound();
         waitTime = 0;
       }, 3500);
     }

     // Gamer Gets it wrong!
   } else {

     //Add Score to Table
     fillTable(document.getElementById('highscore').value == "" ? "Player" : document.getElementById('highscore').value, round - 1, Math.floor(betterScore));

     // no more clicks!
     clearClick();
     //play the "wrong" sound
     var audio;
     audio = new Audio('wrong.wav');
     audio.play();

     //let user know its game over
     document.getElementById('title').innerHTML = "GAME OVER!";
     //defines what to do next how to play again
     document.getElementById('message').innerHTML = "Click Center to Play Again";
     //sets up how user will play again and runs function START
     document.getElementById('middle').setAttribute("onClick", "start()");

     //ends early as to not keep running program now that user has messed up
     //This little code is very important
     return;
   }

 }

 // changes html num (1=up, 2=left, 3=middle, 4=right 5=down) for a given number of seconds "wait"
 //and plays a sound for each 
 function changeColor(num, wait) {

   switch (num) {
     case 1:
       audio = new Audio('a.wav');
       audio.play();
       document.getElementById("up").style.borderBottom = "9.375em solid darkred";
       setTimeout(function () {
         document.getElementById("up").style.borderBottom = "9.375em solid #FF2400";
       }, wait);
       break;
     case 2:
       audio = new Audio('b.wav');
       audio.play();
       document.getElementById("left").style.borderRight = "9.375em solid chocolate";
       setTimeout(function () {
         document.getElementById("left").style.borderRight = "9.375em solid orange";
       }, wait);
       break;
     case 3:
       audio = new Audio('c.wav');
       audio.play();
       document.getElementById("middle").style.backgroundColor = "#999900";
       setTimeout(function () {
         document.getElementById("middle").style.backgroundColor = "#FFF205";
       }, wait);
       break;
     case 4:
       audio = new Audio('d.wav');
       audio.play();
       document.getElementById("right").style.borderLeft = "9.375em solid darkgreen";
       setTimeout(function () {
         document.getElementById("right").style.borderLeft = "9.375em solid #7CFF01";
       }, wait);
       break;
     case 5:
       audio = new Audio('e.wav');
       audio.play();
       document.getElementById("down").style.borderTop = "9.375em solid darkblue";
       setTimeout(function () {
         document.getElementById("down").style.borderTop = "9.375em solid #01CFF4";
       }, wait);
   }
 }

 //Hope you enjoyed checking out my code 
 //feel free to email me at ZWhiteShadow@Yahoo.com
 //and tell me what you think

 //Last Update 12/14/2019