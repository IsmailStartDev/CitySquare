document.addEventListener('DOMContentLoaded', function() {
    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;

        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
                document.location.reload();
            }


        }, 1000);
    }

    window.onload = function () {
        var elem = document.querySelector('[data-counter]'),
            timerVal = Number(elem.getAttribute('data-counter')),

            timerCounter = timerVal * 60,
            display = document.querySelector('time');
        startTimer(timerCounter, display);
    };
});