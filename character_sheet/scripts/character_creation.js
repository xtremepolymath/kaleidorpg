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
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function preLoadXml(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loadSheetInfo(this);
        }
    };

    xhttp.open("GET", "data/xml/character_sheet_save_load.xml", true);
    xhttp.send();
}

function loadSheetInfo(savedXml){

    xmlDoc = savedXml.responseXML;

    //Remove whitespace from XML before using it
    var s = new XMLSerializer();
    var str = s.serializeToString(xmlDoc);
    str = str.replace(/>\s*/g, '>');  // Replace "> " with ">"
    str = str.replace(/\s*</g, '<');  // Replace "< " with "<"
    cleanXML = new DOMParser().parseFromString(str, "text/xml");

    //Get attributes and add to sheet
    var attsXML = cleanXML.getElementsByTagName('character')[0].childNodes;
    //document.getElementById("test").innerHTML = attsXML[0].childNodes[0].nodeValue;
    for(var i = 0; i < attsXML.length; i++){
        a = document.getElementById(attsXML[i].nodeName);
        a.innerHTML = attsXML[i].childNodes[0].nodeValue;
    }
}

