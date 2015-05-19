
var touching = false;
var touchid = -1;
var initx;
var inity;
var newx;
var newy;
var radiusstart = 10;
var radiusmove = 4;
var scalex = 1;
var scaley = 1;

function init() {
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleEnd, false);
  el.addEventListener("touchleave", handleEnd, false);
  el.addEventListener("touchmove", handleMove, false);
  log("initialized.");
  $("#initButton").hide;
}

function draw() {
    var el = document.getElementsByTagName("canvas")[0];
    var ctx = el.getContext("2d");
    ctx.clearRect(0,0,canvas.width,,canvas.height);
    if (touching) {
        ctx.beginPath();
        ctx.arc(initx, inity, radiusstart, 0,2*Math.PI, false);
        ctx.fillStyle = "#888888";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(newx, newy, radiusmove, 0,2*Math.PI, false);
        ctx.fillStyle = "#AAAAAA";
        ctx.fill();
    }
}

function handleStart(evt) {
  evt.preventDefault();
  log("touchstart.");
  var touches = evt.changedTouches;

  if(touches.length == 1 && !touching) {
    touchid = touches[0].identifier;
    initx = touches[0].pageX;
    inity = touches[0].pageY;
    postData(0,0,$("#name").html());
  }
  draw();
}

function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i=0; i < touches.length; i++) {
        if (touches[i].identifier == touchid) {
            newx = touches[i].pageX;
            newy = touches[i].pageY;
            postData((newx-initx)*scalex,(newy-inity)*scaley,$("#name").html());
            
        }
  }
  draw();
}

function handleEnd(evt) {
  evt.preventDefault();
  log("touchend/touchleave.");
  var touches = evt.changedTouches;

  for (var i=0; i < touches.length; i++) {
        if (touches[i].identifier == touchid) {
        touchid = -1;
        touching = false;
        postData(0,0,$("#name").html());
    }
  }
  draw();
}

function postData(tiltLR, tiltFB, name) {
    if (touching) {
        $.ajax({
            type: "POST",
            url: "/vel/" + name,
            data: {
                tilt_lr: tiltLR,
                tilt_fb: tiltFB,
                zero_lr: 0
                zero_fb: 0
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: "/vel/" + name,
            data: {
                tilt_lr: 0,
                tilt_fb: 0,
                zero_lr: 0,
                zero_fb: 0
            }
        });
    }
}

