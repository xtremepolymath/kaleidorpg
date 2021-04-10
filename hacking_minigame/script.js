var current_danger = 0;
var goal;
var current_progress = 0;
var lastButtonPushed;
var lastActionGoal;
var countdown = 10;
var hackNumber = 1;

const hack1Goal = 340;
const hack2Goal = 740;
const hack3Goal = 570;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function startHack(){
    console.log(windows.length);
    array.forEach(element => {
        
    });
}

function setGoal(hack) {
    switch(hack){
        case 1:
            goal = hack1Goal;
            break;
        case 2:
            goal = hack2Goal;
            break;
        case 3:
            goal = hack3Goal;
    }
    document.getElementById("goal-icon").style.transform = "translateX(" + goal + "px)";

    lastActionGoal = document.getElementById("lastActionGoal").innerHTML;

    hackNumber = hack;

    if(hackNumber === 2){
        moveProgress(1050);
    }
}

function moveProgress(amt, event) {
    current_progress = current_progress + amt;
    if(current_progress < 0) current_progress = 0;
    else if(current_progress > 1050) current_progress = 1050;
    document.getElementById("progress-icon").style.transform = "translateX(" + current_progress + "px) rotate(180deg)";

    if(event !== null){
        lastButtonPushed = event.currentTarget.value;
        checkForWin(current_progress, lastButtonPushed);
        increaseDangerLevel();
    }
}

function checkForWin(current_progress){

    if(current_progress === goal) {
        if(lastButtonPushed !== lastActionGoal){
            console.log("You must end on a different action");
            return;
        }

        hackNumber += 1;

        console.log(hackNumber);
        if(hackNumber < 4){
            window.location.href = 'hack' + hackNumber + '.html';
        } else {
            window.location.href = 'win.html';
        }
    }
}

function increaseDangerLevel(){
    current_danger = current_danger + 10;
    document.getElementById("danger-fill").style.width = current_danger + "%";

    if(current_danger === 90){
        redOverlay.style.opacity = 0.25;
        var redFlashing = setInterval(function(){
            if( redOverlay.style.opacity == 0 || redOverlay.style.opacity === ""){
                redOverlay.style.opacity = 0.25;
            } else {
                redOverlay.style.opacity = 0;
            }
            console.log(redOverlay.style.opacity);

            if(current_danger != 90){
                redOverlay.style.opacity = 0;
                clearInterval(redFlashing);
            }
        }, 1000);
    }

    if(current_danger === 100){
        window.location.href = 'timeout.html';
    }
}

function reset(){
    if(hackNumber == 2){
        moveProgress(2000, null);
    } else {
        moveProgress(-2000, null);
    }
    
    document.getElementById("danger-fill").style.width = "0%";
    current_danger = 0;
}

function startCountdown(){
    document.getElementById('timer').innerHTML = countdown;
    var timer = setInterval(function(){
        if(countdown <= 0){
            clearInterval(timer);
            window.location.href = 'hack' + hackNumber + '.html';
            countdown = 60;
        }
        countdown -= 1;
        document.getElementById('timer').innerHTML = countdown;
    }, 1000);
}