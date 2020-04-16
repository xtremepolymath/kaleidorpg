//XML Functions
function getXmlForLoad(char_ID){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loadSheetInfo(this, char_ID);
        }
    };
    
    xhttp.open("GET", "data/xml/character_sheet_save_load.xml", true);
    xhttp.send();
}

function loadSheetInfo(savedXml, char_ID){

    //Retrieve loaded XML doc
    xmlDoc = savedXml.responseXML;

    //Remove whitespace from XML before using it
    var s = new XMLSerializer();
    var str = s.serializeToString(xmlDoc);
    str = str.replace(/>\s*/g, '>');  // Replace "> " with ">"
    str = str.replace(/\s*</g, '<');  // Replace "< " with "<"
    cleanXML = new DOMParser().parseFromString(str, "text/xml");

    //Save cleaned up list of characters as an array
    var attsXML = cleanXML.getElementsByTagName('character');

    //Find character based on char_ID variable
    for(var i = 0; i < attsXML.length; i++){
        if(attsXML[i].attributes[0].value == char_ID){
            var xmlToLoad = attsXML[i].childNodes;
        }
    }

    //Test resulting XML list
    

    //Insert XML values into appropriate HMTL spots
    for(var i = 0; i < xmlToLoad.length; i++){
        a = document.getElementById(xmlToLoad[i].nodeName);
        a.innerHTML = xmlToLoad[i].childNodes[0].nodeValue;
    }

    //Update sheet calculations
    updateSkillChart();
    updateAttrModView();
}

function getXmlForSave(char_ID){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            saveSheetInfo(this, char_ID);
        }
    };

    xhttp.open("GET", "data/xml/character_sheet_save_load.xml", true);
    xhttp.send();
}

function saveSheetInfo(loadedXml, char_ID){

    //Retrieve loaded xml
    xmlDoc = loadedXml.responseXML;

    //Remove whitespace from XML before using it
    var s = new XMLSerializer();
    var str = s.serializeToString(xmlDoc);
    str = str.replace(/>\s*/g, '>');  // Replace "> " with ">"
    str = str.replace(/\s*</g, '<');  // Replace "< " with "<"
    cleanXML = new DOMParser().parseFromString(str, "text/xml");

    //Save cleaned up list of characters as an array
    var charArray = cleanXML.getElementsByTagName('character');
    
    //Get child nodes for current character
    for(var i = 0; i < charArray.length; i++){
        if(charArray[i].attributes[0].value == char_ID){
            charNodes = charArray[i].childNodes;
        }
    }

    var eleArray = [];

    document.getElementById('save').innerHTML = document.getElementById(charNodes[7].nodeName).tagName;

    //Find corresponding HTML elements
    for(var i = 0; i < charNodes.length; i++){
        eleArray[i] = document.getElementById(charNodes[i].nodeName).value;
    }

    outputSave(eleArray);
}

function outputSave(outputData){
    var textToBLOB = new Blob([outputData], {type: 'text/plain'});
    var sFileName = 'KaleidoRPG_save' + toString(char_ID) + '.txt';
    var newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null){
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }

    else{
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}


//General viewing functions
function bodyPanelSwitch(evt, tabName) {
    var i, tabLinks;
    tabContent = document.getElementsByClassName("body_panel_content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("body_panel_button");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function charPanelSwitch(evt, tabName) {
    var i, tabLinks;
    tabContent = document.getElementsByClassName("char_content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("char_button");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function updateSkillChart(){
    var skillValNodes = document.getElementsByClassName("skill_level_value");
    var skillCharts = document.getElementsByClassName("skill_level_chart");
    var skillVals = [];

    for(var i = 0; i < skillValNodes.length; i++){
        skillVals[i] = skillValNodes[i].children[0].innerHTML;
    }

    //document.getElementById('save').innerHTML = skillCharts.length;

    for(var i=0; i < skillCharts.length; i++){
        for(var j=0; j < skillCharts[0].children.length; j++){
            skillCharts[i].children[j].style.backgroundColor = "";
        }
    }

    for(var x=0; x < skillVals.length; x++){
        var skillLvl = skillVals[x];
        for(var y=0; y < skillLvl; y++){
            skillCharts[x].children[y].style.backgroundColor = "red";
        }
    }

}

function increaseSkill(skillVal){
    var ptsAvail = document.getElementById('skill_points_avail').value;
    if(ptsAvail > 0){
        var skillInt = parseInt(document.getElementById(skillVal).innerHTML);
        var newLvl = skillInt + 1;

        if(skillInt != 41){
            document.getElementById(skillVal).innerHTML = newLvl;
            ptsAvail = ptsAvail - 1;
        }

        updateSkillChart();
    }

    document.getElementById('skill_points_avail').value = ptsAvail;
}

function decreaseSkill(skillVal){
    var ptsAvail = parseInt(document.getElementById('skill_points_avail').value);
    var skillInt = parseInt(document.getElementById(skillVal).innerHTML);
    var newLvl = skillInt - 1;

    if(skillInt != 0){
        document.getElementById(skillVal).innerHTML = newLvl;
        ptsAvail = ptsAvail + 1;
    }

    updateSkillChart();

    document.getElementById('skill_points_avail').value = ptsAvail;
}


//Automated calculations
function updateAttrMod(attVal, mod){

    if(attVal == 2|| attVal == 3){
        document.getElementById(mod).innerHTML = -4;
    }
    else if(attVal == 4|| attVal == 5){
        document.getElementById(mod).innerHTML = -3;
    }
    else if(attVal == 6|| attVal == 7){
        document.getElementById(mod).innerHTML = -2;
    }
    else if(attVal == 8|| attVal == 9){
        document.getElementById(mod).innerHTML = -1;
    }
    else if(attVal == 10|| attVal == 11){
        document.getElementById(mod).innerHTML = -0;
    }
    else if(attVal == 12|| attVal == 13){
        document.getElementById(mod).innerHTML = 1;
    }
    else if(attVal == 14|| attVal == 15){
        document.getElementById(mod).innerHTML = 2;
    }
    else if(attVal == 16|| attVal == 17){
        document.getElementById(mod).innerHTML = 3;
    }
    else if(attVal == 18|| attVal == 19){
        document.getElementById(mod).innerHTML = 4;
    }
    else if(attVal == 20|| attVal == 21){
        document.getElementById(mod).innerHTML = 5;
    }
    else if(attVal == 22|| attVal == 23){
        document.getElementById(mod).innerHTML = 6;
    }
    else if(attVal == 24|| attVal == 25){
        document.getElementById(mod).innerHTML = 7;
    }
    else if(attVal == 26|| attVal == 27){
        document.getElementById(mod).innerHTML = 8;
    }
    else if(attVal == 28|| attVal == 29){
        document.getElementById(mod).innerHTML = 9;
    }
    else if(attVal == 30){
        document.getElementById(mod).innerHTML = 10;
    }
}

function updateAttrModView(){
    atts = document.getElementsByClassName("attr_value");

    for(var i = 0; i < atts.length; i++){
        attVal = atts[i].innerHTML;

        if(attVal == 2|| attVal == 3){
            document.getElementsByClassName("attr_mod")[i].innerHTML = -4;
        }
        else if(attVal == 4|| attVal == 5){
            document.getElementsByClassName("attr_mod")[i].innerHTML = -3;
        }
        else if(attVal == 6|| attVal == 7){
            document.getElementsByClassName("attr_mod")[i].innerHTML = -2;
        }
        else if(attVal == 8|| attVal == 9){
            document.getElementsByClassName("attr_mod")[i].innerHTML = -1;
        }
        else if(attVal == 10|| attVal == 11){
            document.getElementsByClassName("attr_mod")[i].innerHTML = -0;
        }
        else if(attVal == 12|| attVal == 13){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 1;
        }
        else if(attVal == 14|| attVal == 15){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 2;
        }
        else if(attVal == 16|| attVal == 17){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 3;
        }
        else if(attVal == 18|| attVal == 19){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 4;
        }
        else if(attVal == 20|| attVal == 21){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 5;
        }
        else if(attVal == 22|| attVal == 23){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 6;
        }
        else if(attVal == 24|| attVal == 25){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 7;
        }
        else if(attVal == 26|| attVal == 27){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 8;
        }
        else if(attVal == 28|| attVal == 29){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 9;
        }
        else if(attVal == 30){
            document.getElementsByClassName("attr_mod")[i].innerHTML = 10;
        }
    }
}