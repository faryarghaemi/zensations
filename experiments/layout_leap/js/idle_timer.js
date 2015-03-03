$(document).ready(function() {
    var idleTime = 0;
    $(document).ready(function () {
        //Increment the idle time counter every second.
        var idleInterval = setInterval(timerIncrement, 1000); // 1 second

        //Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
            $('.audio-controls').show();
            idleTime = 0;
        });
        $(this).keypress(function (e) {
            $('.audio-controls').show();
            idleTime = 0;
        });
    });

    function timerIncrement() {
        idleTime = idleTime + 1;
        if (idleTime > 2) { // 2 seconds
            $('.audio-controls').fadeOut(2000);
        }
    }
});

