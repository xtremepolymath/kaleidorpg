function loadXML(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loadSavedCharacters(this);
        }
    };

    xhttp.open("GET", "data/xml/character_sheet_save_load.xml", true);
    xhttp.send();
}

function loadSavedCharacters(savedXml){

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
        currentID = attsXML[i].attributes[0].value;
        getCharacterInfo(attsXML[i].childNodes, currentID);
    }
}

function getCharacterInfo(charNodes, id){
    var charElement = document.getElementById(id).children[1].children;

    for(var i=0; i < charElement.length; i++){
        for(var j=0; j < charNodes.length; j++){
            if(charElement[i].id == charNodes[j].nodeName){
                charElement[i].innerHTML = charNodes[j].childNodes[0].nodeValue;
            }
        }
    }
}

function loadSheetView(evt){
    var char_id = evt.currentTarget.parentElement.id;
    localStorage.setItem("char_ID", char_id);
    location.href="sheet_view.html";
}