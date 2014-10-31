
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

    $("#test").html(tiltFB);

    // do shit here
}
