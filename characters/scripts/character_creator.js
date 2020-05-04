function switchRacePanel(race){
    var racePans = document.getElementsByClassName("race_panel");
    for(var i=0;i<racePans.length;i++){
        racePans[i].style.height = "0px";
    }

    document.getElementById(race).style.height = "700px";

}