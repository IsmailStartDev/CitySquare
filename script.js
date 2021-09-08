import "./style.scss";
import "./images/update-img-desktop-1x.jpg";
import "./images/update-img-desktop-2x.jpg";

document.addEventListener('DOMContentLoaded', function() {
    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;

        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.innerHTML = minutes + "<span> : </span>" + seconds;

            if (--timer < 0) {
                timer = duration;
                document.location.reload();
            }
        }, 1000);
    }

    var elem = document.querySelector('[data-counter]'),
        timerVal = Number(elem.getAttribute('data-counter')),

        timerCounter = timerVal * 60,
        display = document.querySelector('.info__timer');

    startTimer(timerCounter, display);
});