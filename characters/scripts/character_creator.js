//Load skill and perk xml

function getPerkActionXML(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loadSkillPerks(this);
            
        }
    };
    
    xhttp.open("GET", "data/xml/skills_perks.xml", true);
    xhttp.send();
}

var skillXML;

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

    skillXML = skillList;

    for(var i = 0; i < skillXML.length; i++){
        var exp_1 = skillXML[i].childNodes[3].childNodes[0].childNodes[0].nodeValue;
        var exp_2 = skillXML[i].childNodes[4].childNodes[0].childNodes[0].nodeValue;

        document.getElementsByClassName("expertise_dropdown")[i].children[0].innerHTML = exp_1;
        document.getElementsByClassName("expertise_dropdown")[i].children[1].innerHTML = exp_2;
    }

}

//SAVE FEATURE
textToSave = new Array(67);



function charPanelSwitch(evt, tabName) {
    if(tabName != "main_panel"){
        if(textToSave[2] == undefined){
            alert("Please select a race before proceeding! You can come back and change this if you want to.");
            return;
        }
        else{
            updateInfoSkills();
        }
    }

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

function switchRacePanel(race){
    var racePans = document.getElementsByClassName("race_panel");
    for(var i=0;i<racePans.length;i++){
        racePans[i].style.visibility= "hidden";
    }

    document.getElementById(race).style.visibility = "visible";

}

function confirmRace(race){
    textToSave[2] = race;
    document.getElementsByClassName("char_menu_button")[1].click();
}

function updateInfoSkills(){
    document.getElementById("rc").innerHTML = textToSave[2];
    var lang = document.getElementById("race_lang");
    switch(textToSave[2]){
        case "Human":
            lang.innerHTML = "whatever Earthly language you would like.";
            document.getElementById("skills_avail").innerHTML = 5;
            break;
        case "Cyborg":
            lang.innerHTML = "whatever Earthly language you would like.";
            document.getElementById("tech_level").innerHTML = 5;
            document.getElementById("skills_avail").innerHTML = 2;
            break;
        case "Quexi":
            lang.innerHTML = "the ancient Etruscan language.";
            document.getElementById("random_name").href = "https://www.fantasynamegenerators.com/etruscan-names.php";
            document.getElementById("tech_level").innerHTML = 10;
            document.getElementById("pistol_level").innerHTML = 5;
            document.getElementById("gravity_level").innerHTML = 5;
            document.getElementById("skills_avail").innerHTML = 1;
            break;
        case "Aerhza":
            lang.innerHTML = "the ancient Edo language.";
            document.getElementById("random_name").href = "https://www.fantasynamegenerators.com/edo-japanese-names.php";
            break;
        case "Muhmin":
            lang.innerHTML = "the Amazigh/Berber language.";
            document.getElementById("random_name").href = "https://www.fantasynamegenerators.com/amazigh-names.php";
            break;
        case "Koz'aid":
            lang.innerHTML = "the ancient Assyrian language.";
            document.getElementById("random_name").href = "https://www.fantasynamegenerators.com/assyrian-names.php";
            break;
        case "Veith":
            lang.innerHTML = "the Samoan language.";
            document.getElementById("random_name").href = "https://www.fantasynamegenerators.com/samoan-names.php";
            break;
        case "Ts’Tsen":
            lang.innerHTML = "the Quechua language. You only need to use one surname and may simplify complex names to make them easier.";
            document.getElementById("random_name").href = "https://www.fantasynamegenerators.com/quechua-names.php";
            break;
    }

    updateSkillChart();
    updateSkillActions();
}

function showBGs(id){
    var info = document.getElementById(id);

    if (info.style.display === "block") {
        info.style.display = "none";
    } 
    else {
        info.style.display = "block";
    }
}

function chooseBG(event){
    document.getElementById("char_bg").value = event.innerHTML;
    showBGs("bg_popup");
}

function chooseAlign(event){

    var aligns = document.getElementsByClassName("align");

    for(var i=0;i<aligns.length;i++){
        aligns[i].style.backgroundColor = "";
        aligns[i].dataset.active = "false";
    }

    event.dataset.active = "true";
    event.style.backgroundColor = "rgb(34,162,179)";

}

function saveInfo(){
    textToSave[1] = 1;
    var char_name = document.getElementById("char_name").value;
    var char_gend = document.getElementById("char_gend").value;
    var char_bg = document.getElementById("char_bg").value;
    var char_align;
    var aligns = document.getElementsByClassName("align");

    for(var i=0;i<aligns.length;i++){
        if(aligns[i].dataset.active == "true"){
            char_align = aligns[i].innerHTML
        }
    }

    textToSave[0] = char_name;
    textToSave[3] = char_gend;
    textToSave[4] = char_bg;
    textToSave[5] = char_align;

    var charSkillArray = [];
    var skillLvls = document.getElementsByClassName("skill_level_value");
    var skillExps = document.getElementsByClassName("expertise_container");

    for(var i=0; i<40;i++){

        var nextSaveItem;
        var ind;
        if(i == 0){
            ind = 0;
        }
        else{
            ind = Math.floor(i/2);
        }

        if(i % 2 == 0){
            
            nextSaveItem = skillLvls[ind].children[0].innerHTML;
        }
        else{
            nextSaveItem = skillExps[ind].children[0].innerHTML;
        }

        charSkillArray.push(nextSaveItem);
    }

    for(var i=27;i<67;i++){
        textToSave[i] = charSkillArray[i - 27];
    }
}

function updateSkillChart(){
    var skillValNodes = document.getElementsByClassName("skill_level_value");
    var skillCharts = document.getElementsByClassName("skill_level_chart");
    var skillVals = [];

    for(var i = 0; i < skillValNodes.length; i++){
        skillVals[i] = skillValNodes[i].children[0].innerHTML;
    }

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
    var p_list = [];
    var expertise = evt.currentTarget.parentElement.parentElement.children[6].children[0].innerHTML;

    if(lvl < 25){
        p_list = s[5].childNodes;
        for(var p=0; p<p_list.length;p++){
            if(p_list[p].childNodes[1].childNodes[0].nodeValue == lvl){
                perk = p_list[p].childNodes;
            }
        }
    }
    if(lvl >= 25){
        if(expertise == s[3].childNodes[0].childNodes[0].nodeValue){
            p_list = s[3].childNodes[3].childNodes;
            for(var p=0; p<p_list.length;p++){
                if(p_list[p].childNodes[1].childNodes[0].nodeValue == lvl){
                    perk = p_list[p].childNodes;
                }
            }
        }
        else if(expertise == s[4].childNodes[0].childNodes[0].nodeValue){
            p_list = s[4].childNodes[3].childNodes;
            for(var p=0; p<p_list.length;p++){
                if(p_list[p].childNodes[1].childNodes[0].nodeValue == lvl){
                    perk = p_list[p].childNodes;
                }
            }
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
}

function hidePerkInfo(){
    document.getElementById("perk_info_box").style.display = "none";
}

function setExpertise(evt){
    evt.parentElement.parentElement.children[0].innerHTML = evt.innerHTML;
}

function chooseSkill(evt){
    var skillRow = evt.parentElement;

    if(evt.style.backgroundColor == "rgb(100, 100, 100)"){
        skillRow.style.backgroundColor = "";
        evt.style.backgroundColor = "#E8903B";
        evt.innerHTML = "Select";
        skillRow.children[4].children[0].innerHTML = 0;
        document.getElementById("skills_avail").innerHTML = parseInt(document.getElementById("skills_avail").innerHTML) + 1;
    }
    else{
        if(skillRow.children[4].children[0].innerHTML != 0){
            return;
        }
        else if(document.getElementById("skills_avail").innerHTML > 0){
            skillRow.style.backgroundColor = "#E8903B";
            evt.style.backgroundColor = "rgb(100, 100, 100)";
            evt.innerHTML = "Deselect";
            if(textToSave[2] == "Cyborg"){
                skillRow.children[4].children[0].innerHTML = 10;
            }
            else{
                skillRow.children[4].children[0].innerHTML = 5;
            }
            document.getElementById("skills_avail").innerHTML = parseInt(document.getElementById("skills_avail").innerHTML) - 1;
        }
    }

    updateSkillChart();
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

function filterActions(event, table){
    document.getElementById("current_filter").innerHTML = event.innerHTML;

    var cats = document.getElementsByClassName('action_category');
    
    for(var i=0;i<cats.length;i++){
        if(table == "all"){
            cats[i].style.display = "table";
        }
        else{
            cats[i].style.display = "none";
            document.getElementById(table).style.display = "table";
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

    var skillLvls = document.getElementsByClassName("skill_level_value");

    //Run through skill level values in character sheet
    for(var i=0; i< skillLvls.length; i++){

        //We don't care about skills that are at zero and we will look at expertise later
        if(skillLvls[i].children[0].innerHTML != 0 && skillLvls[i].children[0].innerHTML < 25){

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

    var currentMajorActions = document.getElementById("major_action_table").children.length - 1;
    var currentMinorActions = document.getElementById("minor_action_table").children.length - 1;
    var currentMoveActions = document.getElementById("move_action_table").children.length - 1;
    var currentExtraActions = document.getElementById("extra_action_table").children.length - 1;
    var currentNoncombatActions = document.getElementById("noncombat_action_table").children.length - 1;

    for(var i=currentMajorActions; i < majorActions.length; i++){
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

function viewSave(){
    var string = "";

    for(var i=0;i<textToSave.length;i++){
        if(textToSave[i] == "undefined"){
            string = string + "" + ",";
        }
        else{
            string = string + textToSave[i] + ",";
        }
    }

    alert(string);
}