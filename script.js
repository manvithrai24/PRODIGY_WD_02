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
        document.getElementById('pause').textContent = 'Pause'; // Ensure button says "Pause"
    }
}

function pauseStopwatch() {
    const pauseButton = document.getElementById('pause');
    if (running) {
        running = false;
        clearInterval(tInterval);
        pauseButton.textContent = 'Resume'; // Change to Resume when paused
    } else {
        running = true;
        startTime = new Date().getTime() - difference; // Resume where left off
        tInterval = setInterval(updateTime, 1);
        pauseButton.textContent = 'Pause'; // Change back to Pause when running
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    document.getElementById('display').innerHTML = '00:00:00:000'; // Reset to include milliseconds
    document.getElementById('lapList').innerHTML = '';
    lapCounter = 1;
    running = false;
    document.getElementById('pause').textContent = 'Pause'; // Reset Pause/Resume button
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
    const milliseconds = Math.floor(difference % 1000); // Calculate milliseconds

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMilliseconds = milliseconds < 100 
        ? milliseconds < 10 
            ? '00' + milliseconds 
            : '0' + milliseconds 
        : milliseconds; // Format to always display 3 digits

    document.getElementById('display').innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}
