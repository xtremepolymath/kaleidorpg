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

//Load skill and perk xml
var skillXML;

function getPerkActionXML(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            skillXML = loadSkillPerks(this);
        }
    };
    
    xhttp.open("GET", "data/xml/skills_perks.xml", true);
    xhttp.send();
}

function loadSkillPerks(savedXml){

    //Retrieve loaded XML doc
    xmlDoc = savedXml.responseXML;

    //Remove whitespace from XML before using it
    var s = new XMLSerializer();
    var str = s.serializeToString(xmlDoc);
    str = str.replace(/>\s*/g, '>');  // Replace "> " with ">"
    str = str.replace(/\s*</g, '<');  // Replace "< " with "<"
    cleanXML = new DOMParser().parseFromString(str, "text/xml");

    //Save cleaned up list of characters as an array
    var skillList = cleanXML.getElementsByTagName('skill');

    return skillList;
}

//Contact character list XML
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
//Get HTML info based on XML nodes
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

    //document.getElementById('save').innerHTML = document.getElementById(charNodes[7].nodeName).tagName;

    //Find corresponding HTML elements
    for(var i = 0; i < charNodes.length; i++){
        eleArray[i] = document.getElementById(charNodes[i].nodeName).value;
    }

    outputSave(eleArray);
}
//Download a text file with new save info
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

function newAction(name, description, category){
    var action = document.createElement('tr');
    action.innerHTML = '<td class="action_name" style="padding: 10px 20px;font-weight:bold; width: 50px;font-size:10pt;">'+name+'</td><td class="action_description" style="padding: 10px 20px;font-size:10pt;">'+description+'</td>';

    return action;
}

var majorActions = [];
var minorActions = [];
var moveActions = [];
var noncombatActions = [];
var extraActions = [];


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

function showPerkInfo(evt, skill, lvl){

    //Show perk info box and move its location to mouse location
    var pib = document.getElementById("perk_info_box");
    pib.style.display = "block";
    pib.style.position = "absolute";
    pib.style.left = evt.clientX+"px";
    pib.style.top = evt.clientY+"px";

    //Find current skill based on skill input and save it in the s variable
    var s;
    for(var i=0;i<skillXML.length;i++){
        if(skillXML[i].childNodes[0].childNodes[0].nodeValue == skill){
            s = skillXML[i].childNodes;
        }
    }

    //Find the current perk based on lvl input and save it in the perk variable
    var perk;
    var p_list = s[5].childNodes;
    for(var p=0; p<p_list.length;p++){
        if(p_list[p].childNodes[1].childNodes[0].nodeValue == lvl){
            perk = p_list[p].childNodes;
        }
    }

    //Clear any old information
    for(var i=0;i<perk.length;i++){
        var ele = document.getElementById(perk[i].nodeName);
        ele.innerHTML = "";
    }
    //Insert updated perk information into the perk info window
    for(var i=0;i<perk.length;i++){
        var ele = document.getElementById(perk[i].nodeName);
        ele.innerHTML = perk[i].childNodes[0].nodeValue;
    }


    //document.getElementById("save").innerHTML = skillXML[0].childNodes[0].childNodes[0].nodeValue;
}

function hidePerkInfo(){
    document.getElementById("perk_info_box").style.display = "none";
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

function setDefaultActions(){
    //Major Actions
    majorActions.push(newAction("Melee Attack", "Attack with a currently equipped melee weapon"));
    majorActions.push(newAction("Ranged Attack", "Attack with a currently equipped ranged weapon"));

    //Minor Actions
    minorActions.push(newAction("Take Cover", "Hide behind some adjacent obstacle to prevent being attacked. You are unable to attack or be attacked while in cover unless there is direct line of sight."));
    minorActions.push(newAction("Reload", "Discard your current gun magazine and replace it with a fresh one."));
    minorActions.push(newAction("Weapon Swap", "Switch the currently equipped weapon in either hand for a different weapon in your inventory."));

    //Move Actions
    moveActions.push(newAction("Walk", "You may move up a number of meters equal to your current movement available. This can be broken up between other actions as desired."));
    moveActions.push(newAction("Run", "You may move up a number of meters equal to twice your current movement available. You cannot reload or swap weapons and run in the same turn. Ranged attacks are at a disadvantage any turn you run unless otherwise stated."));
    moveActions.push(newAction("Get Up", "If knocked prone, you use 7 movement to get back up."));

    //Extra Actions
    extraActions.push(newAction("Bash", "After successfully dealing damage with a blunt weapon, target rolls a Con saving throw of 10 plus your skill mod. On a failure, they are staggered for a turn."));
    extraActions.push(newAction("Bleed", "After dealing damage with a blade, target rolls a DEX saving throw of 10+ your skill mod. If successful, target now takes 1d4 bleed damage for 2 turns. This effect may stack."));
    extraActions.push(newAction("Spray", "After successfully rolling a hit with an assault weapon, roll a d4. On a 0, you deal no damage, on a 1 you deal half damage, on a 2 or 3 you deal normal damage, on a 4 you deal 1.5 times damage (rounded down). Each subsequent spray roll, you must subtract an additional -1 from the result."));
    extraActions.push(newAction("Proximity", "Roll a d20 + skill mod to determine a DEX saving throw number for everything within the explosive's radius. Every failure is dealt damage based on their proximity to the explosion and every success takes no damage, but must move to a space outside of the explosive radius."));
}

function updateSkillActions(){

    var currentActions = [];
    
    for(var i=0; i<document.getElementsByClassName("action_name").length; i++){
        currentActions[i] = document.getElementsByClassName("action_name")[i].innerHTML;
    }

    //document.getElementById("save").innerHTML = currentActions.includes("Melee Attack");

    var skillLvls = document.getElementsByClassName("skill_level_value");

    //Run through skill level values in character sheet
    for(var i=0; i< skillLvls.length; i++){

        //We don't care about skills that are at zero
        if(skillLvls[i].children[0].innerHTML != 0){

            //Number of perks unlocked is equal to skill level divided by 5, rounded down, plus 1
            var numPerks = Math.floor(skillLvls[i].children[0].innerHTML / 5) + 1;

            //Run through the unlocked perks of the current skill
            for(var j=0; j<numPerks;j++){
                var perk = skillXML[i].childNodes[5].childNodes[j];
                var actionName = perk.childNodes[0].childNodes[0].nodeValue;

                //Check to see if we've already added the current action
                if(currentActions.includes(actionName) == false){
                    var actionCheck = perk.childNodes[3];
                    //Make sure we're looking at an action, not a regular perk.
                    if(actionCheck.hasChildNodes()){
                        var actionDesc = actionCheck.childNodes[0].nodeValue;
                        var actionCat = perk.childNodes[4].childNodes[0].nodeValue;
                        pushNewAction(actionName, actionDesc, actionCat);
                    }
                }
            }
        }
    }

    //Re-display all actions
    showAvailableActions();
}

function pushNewAction(name, desc, category){
    if(category == "Major"){
        majorActions.push(newAction(name, desc));
    }
    else if(category == "Minor"){
        minorActions.push(newAction(name, desc));
    }
    else if(category == "Move"){
        moveActions.push(newAction(name, desc));
    }
    else if(category == "Extra"){
        extraActions.push(newAction(name, desc));
    }
    else if(category == "Non-Combat"){
        noncombatActions.push(newAction(name, desc));
    }
    else{
        majorActions.push(newAction(name, desc));
    }
}

function showAvailableActions(){

    for(var i=0; i < majorActions.length; i++){
        var act = majorActions[i];
        document.getElementById('major_action_table').appendChild(act);
    }

    for(var i=0; i < minorActions.length; i++){
        var act = minorActions[i];
        document.getElementById('minor_action_table').appendChild(act);
    }

    for(var i=0; i < moveActions.length; i++){
        var act = moveActions[i];
        document.getElementById('move_action_table').appendChild(act);
    }

    for(var i=0; i < extraActions.length; i++){
        var act = extraActions[i];
        document.getElementById('extra_action_table').appendChild(act);
    }

    for(var i=0; i < noncombatActions.length; i++){
        var act = noncombatActions[i];
        document.getElementById('noncombat_action_table').appendChild(act);
    }
}