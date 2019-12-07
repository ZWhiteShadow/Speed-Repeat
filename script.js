function changecolor(num, wait) {
  var audio;

  if (num == 1) {
    audio = new Audio('a.wav');
    audio.play();
    document.getElementById("up").style.borderBottom = "9.375em solid #FF2400";
    setTimeout(function() {
      document.getElementById("up").style.borderBottom = "9.375em solid darkred";
    }, wait);
  }
  if (num == 2) {
    audio = new Audio('b.wav');
    audio.play();
    document.getElementById("left").style.borderRight = "9.375em solid orange";
    setTimeout(function() {
      document.getElementById("left").style.borderRight = "9.375em solid darkorange";
    }, wait);
  }
  if (num == 3) {
    audio = new Audio('c.wav');
    audio.play();
    document.getElementById("middle").style.backgroundColor = "#FFF205";
    setTimeout(function() {
      document.getElementById("middle").style.backgroundColor = "#D7D700";
    }, wait);
  }
  if (num == 4) {
    audio = new Audio('d.wav');
    audio.play();
    document.getElementById("right").style.borderLeft = "9.375em solid #7CFF01";
    setTimeout(function() {
      document.getElementById("right").style.borderLeft = "9.375em solid darkgreen";
    }, wait);
  }
  if (num == 5) {
    audio = new Audio('e.wav');
    audio.play();
    document.getElementById("down").style.borderTop = "9.375em solid #01CFF4";
    setTimeout(function() {
      document.getElementById("down").style.borderTop = "9.375em solid darkblue";
    }, wait);
  }
}
