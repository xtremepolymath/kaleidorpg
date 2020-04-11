function bodyPanelSwitch(evt, tabName) {
    var i, bodyPanelContent, tabLinks;
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

    xmlDoc = savedXml.responseXML;

    //Remove whitespace from XML before using it
    var s = new XMLSerializer();
    var str = s.serializeToString(xmlDoc);
    str = str.replace(/>\s*/g, '>');  // Replace "> " with ">"
    str = str.replace(/\s*</g, '<');  // Replace "< " with "<"
    cleanXML = new DOMParser().parseFromString(str, "text/xml");

    //Get attributes and add to sheet
    var attsXML = cleanXML.getElementsByTagName('character');

    for(var i = 0; i < attsXML.length; i++){
        if(attsXML[i].attributes[0].value == char_ID){
            var xmlToLoad = attsXML[i].childNodes;
        }
    }

    document.getElementById("test").innerHTML = xmlToLoad.length;
    for(var i = 0; i < attsXML.length; i++){
        a = document.getElementById(attsXML[i].nodeName);
        a.innerHTML = attsXML[i].childNodes[0].nodeValue;
    }
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

    //get xml doc and save as variable
    var xmlDoc = new XMLSerializer();
    var attsXML = getElementsById(char_ID)
}
