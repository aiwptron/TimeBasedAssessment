var interval; // Declare interval outside the function to make it accessible

onmessage = function(e) {
    var mainTimer = e.data.mainTimer;
    
    clearInterval(interval); // Clear any existing interval before starting a new one

    interval = setInterval(function() {
        if (mainTimer > 0) {
            mainTimer--;
            postMessage({ type: 'updateTimer', mainTimer: mainTimer });
            
        } else {
            clearInterval(interval); // Clear the interval when timer reaches 0
            postMessage({ type: 'moveToNextQuestion' });
            mainTimer = 30; // Reset timer to 60 seconds
        }
    }, 1000);
};
