
var zeroLR = null;
var zeroFB = null;

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
    postData(tiltLR, tiltFB, "test");

    // do shit here
}

function postData(tiltLR, tiltFB, name) {
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

