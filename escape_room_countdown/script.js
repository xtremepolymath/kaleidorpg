var vidHidden = false;
var currentMinutes = 60;
var currentSeconds = 00;
var secondDisplay = "00";

const alertNoise = new Audio('./tng_red_alert1.mp3');


var winPlaying = false;


document.addEventListener('keypress', function(event){
    if(event.key == "~"){
        toggleVideo();
    }
    if(event.key == 'Enter'){
        startCountdown();
    }
    if(event.key == "`"){
        toggleFullScreen();
    }
});

document.addEventListener('keyup', function(event){
    checkForWin();

});

function toggleFullScreen(){
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen();
    }
}

function toggleVideo(){
    var bgNoise = document.getElementById('bgNoise');
    if(vidHidden == false){
        bgNoise.style.transform = "translateX(-2000px)";
        vidHidden = true;
    } else {
        bgNoise.style.transform = "translateX(0px)";
        vidHidden = false;
    }
}

function startCountdown(){

    
    console.log('here!');

    document.getElementById('timer').innerHTML = currentMinutes + ":" + secondDisplay;

    var timer = setInterval(function(){
        if(currentSeconds == 0){
            currentMinutes -= 1;
            currentSeconds = 59;
            secondDisplay = currentSeconds;
            if(currentMinutes < 5){
                document.getElementById('timer').style.color = "red";
                alertNoise.play();
            }
        } else {
            currentSeconds -= 1;

            if(currentSeconds < 10){
                secondDisplay = "0" + currentSeconds;
            } else {
                secondDisplay = currentSeconds;
            }
        }
        document.getElementById('timer').innerHTML = currentMinutes + ":" + secondDisplay;
    }, 1000);
}

function checkForWin(){
    let inputs = document.getElementsByClassName('letter-input');

    let code = "twooptionsexisteitherwearealoneintheuniverseorwearenotbothareequallyterrifying"

    let answer = "";
    
    for(var i = 0; i < inputs.length; i++){
        answer += inputs[i].value;
    }
    
    if(answer === code){
        scrollWinText();
    }

    console.log(answer);
}

function scrollWinText(){

        document.getElementById("mainPanel").style.display = "none";
        document.getElementById("winPanel").style.display = "flex";
        
        var x = document.getElementById("winSound");
        x.play();
        

        const text = "All systems normal";
        var currentText = "";
        var currentInd = 0;

        var nextLetter = setInterval(function(){
            if(currentInd === text.length){
                clearInterval();
            }
            currentText = text.slice(0,currentInd);
            currentInd += 1;
            document.getElementById("winText").innerHTML = currentText;
        }, 300);

}