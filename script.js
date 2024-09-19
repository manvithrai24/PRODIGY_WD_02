let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
    }
}

function pauseStopwatch() {
    if (running) {
        running = false;
        clearInterval(tInterval);
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    document.getElementById('display').innerHTML = '00:00:00';
    document.getElementById('lapList').innerHTML = '';
    lapCounter = 1;
    running = false;
}

function recordLap() {
    if (running) {
        const lapTime = document.getElementById('display').innerHTML;
        const lapList = document.getElementById('lapList');
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('display').innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
