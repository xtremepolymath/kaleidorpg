function resizeIframe(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + 50 +"px";
    console.log(iframe.height);
  }

function updateWikiContent(fileName){
    document.getElementById("wikiFrame").src = "pages/"+fileName;
}

function wikiDropdown(targ){
    var submenu = document.getElementById(targ);
    if(submenu.children[0].classList.contains("sidebarSubcatActive")){
        dropdownOut(submenu);
    }
    else{dropdownIn(submenu);}
}

function dropdownIn(ele){
    //Remove any dropdowns already there
    dropdowns = document.getElementsByClassName("sidebarSubcatActive");
    if(dropdowns.length > 0){
        dropdownOut(dropdowns[0].parentElement);
    }

    //Now activate the desired dropdown
    for(let i=0;i<ele.children.length;i++){
        ele.children[i].classList.remove("sidebarSubcatHidden");
        ele.children[i].classList.add("sidebarSubcatActive");
    }
    ele.style.height = "auto";
}

function dropdownOut(ele){
    for(var i=0;i<ele.children.length;i++){
        ele.children[i].classList.remove("sidebarSubcatActive");
        ele.children[i].classList.add("sidebarSubcatHidden");
    }
    ele.style.height = "0px";
}