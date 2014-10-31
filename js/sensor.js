
var zeroLR = null;
var zeroFB = null;
var canControl = false;

window.onload = function() {
  getSensorData();
}

function getSensorData() {
    if(window.DeviceOrientationEvent) {
        window.addEventListener(
            'deviceorientation',
            orientationEventHandler,
            false
        );
    } else {
        alert("No sensors dude");
    }
}

// Handles the orientation data
function orientationEventHandler(eventData) {
    var tiltLR = eventData.gamma;
    var tiltFB = eventData.beta;
    var dir = eventData.alpha;

    if (zeroLR == null || zeroFB == null) {
        zeroLR = tiltLR;
        zeroFB = tiltFB;
    }

    // $("#test").html(tiltFB);
    postData(tiltLR, tiltFB, $("#name").html());

    // do shit here
}

function postData(tiltLR, tiltFB, name) {
    if (canControl) {
        $.ajax({
            type: "POST",
            url: "/vel/" + name,
            data: {
                tilt_lr: tiltLR,
                tilt_fb: tiltFB,
                zero_lr: zeroLR,
                zero_fb: zeroFB
            }
        });
    }
}

function calibrateButtonPressed() {
    zeroLR = null;
    zeroFB = null;
}

function stopButtonPressed() {
    if ($("#stopButton").html() == "Stop") {
        canControl = false;
        $("#stopButton").html("Start");
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
    } else if ($("#stopButton").html() == "Start") {
        canControl = true;
        $("#stopButton").html("Stop");
    }
}

