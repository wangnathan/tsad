var primaryColorBase = "#0277BD";
var primaryColorDark = "#004c8c";

var scrolledToBottom = false;

// --- Function Calls ---
allFunctionsForResize();

document.onresize = function() {
  allFunctionsForResize();
}
/*
document.addEventListener('DOMContentLoaded', function() {
  allFunctionsForResize();
}, false);
*/
document.body.onload = function() {
  allFunctionsForResize();
  //hideDropdown();
};

/*document.getElementById("bottom-bar-container").onmouseover = function() {
  expandBottomBar();
};

document.getElementById("bottom-bar-container").onmouseout = function() {
  if (!scrolledToBottom) {
    collapseBottomBar();
  }
};*/

document.getElementsByClassName("dropdown-button")[0].onfocus = function() {
  darkenDropdown(document.getElementsByClassName("dropdown-button")[0]); 
}
document.getElementsByClassName("dropdown-button")[0].onblur = function() {
  lightenDropdown(document.getElementsByClassName("dropdown-button")[0]);
}

// Close side menu when the screen is clicked
window.onclick = function(event) {
  if (event.target.matches("#screen-dim")) {
    closeSideNav();
  }
  if (!(event.target.matches(".dropdown-button") || event.target.matches(".more"))) {
    hideAllDropdownContents();
  }
}

// Collapse the header on scroll
window.onscroll = function() {
  hideElementsOnScroll();
  checkIfReachBottom();
};

function allFunctionsForResize() {
  contentYPos();
  headerWidth();
  contentResize();
  inlineResize();
  hideMenuOnBigScreen();
  resetHeaderTop();
  checkIfReachBottom();
  hideAllDropdownContents();
  //hideDropdown();
}

// Collapse the header on scroll
function hideElementsOnScroll() {
  hideHeaderOnScroll();
  hideAllDropdownContents();
}

function hideHeaderOnScroll() {
  var navbar = document.getElementsByClassName("navbar")[0];
  var header = document.getElementById("header");
  var overlay = document.getElementById("overlay");
  
  header.style.transition = "0.4s";
  
  if (document.body.scrollTop > 85 || document.documentElement.scrollTop > 85) {
    if (window.innerWidth > 555) {
      overlay.style.top = "-100px";
      header.style.top = "-100px";
    }
    navbar.style.top = "0";
  } else {
    overlay.style.top = "0";
    header.style.top = "0";
    navbar.style.top = "100px";
  }
}

function checkIfReachBottom () {
  if (document.documentElement.scrollTop + window.innerHeight - 7.5 >= document.getElementById("bottom-text-bar").offsetTop) {
    //document.getElementById("bottom-bar-container").style.display = "none";
    scrolledToBottom = true;
  } else {
    //document.getElementById("bottom-bar-container").style.display = "block";
    scrolledToBottom = false;
  }
  /*if (window.innerHeight >= document.documentElement.offsetHeight) {
    document.getElementById("bottom-text-bar").style.bottom = 0;
  } else {
    document.getElementById("bottom-text-bar").style.bottom = "auto";
  }*/
}
function resetHeaderTop() {  
  if (window.innerWidth <= 555) {
    document.getElementById("overlay").style.top = "0";
    document.getElementById("header-img").style.top = "0";
  } else {
    if (document.body.scrollTop > 85 || document.documentElement.scrollTop > 85) {
      document.getElementById("overlay").style.top = "-100px";
      document.getElementById("header-img").style.top = "-100px";
      document.getElementById("header").style.top = "-100px";
    }
  }
}
// Resize the width of all contents when the window is resized
function contentResize() {  
  var contents = document.getElementsByClassName("content");
  var width = 0;
  for (var i = 0; i < contents.length; i++) {
    if (window.innerWidth <= 1014 && window.innerWidth >= 650) {
      width = (1014 - window.innerWidth) / (182 / 15);
      if (width >= 30) {
          width = 30;
      }
      contents[i].style.width = 70 + width + "%";
    }
  }
}

function contentImgResize() {  
  var contentImgs = document.getElementsByClassName("content-img");
  var width = 0;
  for (var i = 0; i < contents.length; i++) {
    if (window.innerWidth <= 1014 && window.innerWidth >= 650) {
      width = (1014 - window.innerWidth) / (182 / 15);
      if (width >= 30) {
        width = 30;
      }
      contentImgs[i].style.width = 70 + width + "%";
    }
  }
}
// Resize the width of all inline contents when the window is resize
function inlineResize() {
  var inline = document.getElementsByClassName("inline");
  for (var i = 0; i < inline.length; i++) {
    if (window.innerWidth <= 925) {
      width = (1014 - window.innerWidth) / (182 / 15);
      if (width >= 30) {
        width = 30;
      }
      inline[i].style.maxWidth = 70 + width + "%";
    } 
    if (window.innerWidth > 925) {
      inline[i].style.maxWidth = "25%";
    }
    if (window.innerWidth > 1280) {
      if (!(inline[i].id === "location" || inline[i].id === "schedule")) {
        inline[i].style.maxWidth = "311px";
      }
    }
  }
}

// Slideshow
var slidesIndex = 0;

function carousel() {
  var slides = document.getElementsByClassName("slideshow");
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slidesIndex++;
  if (slidesIndex > slides.length) {
    slidesIndex = 1;
  }
  slides[slidesIndex - 1].style.display = "block";
  slidesResize();
  setTimeout(carousel, 7000);
}

function slidesResize() {
  var slideshowContainer = document.getElementsByClassName("slideshow-container");
  for (var i = 0; i < slideshowContainer.length; i++) {
    if (slideshowContainer[i].style.maxHeight === "") {
      slideshowContainer[i].style.maxHeight = slideshowContainer[i].offsetWidth * (338 / 575) + "px";
    }
    slideshowContainer[i].style.maxHeight = slideshowContainer[i].offsetWidth * (338 / 575) + "px";
  }
}

// --- Side Menu (Mobile or Small Screen) ---

// Open side menu
function openSideNav() {
  var expandIcons = document.getElementsByClassName("more");
  document.getElementById("sidenav").style.left = 0;
  document.getElementById("screen-dim").style.opacity = 1;
  document.getElementById("screen-dim").style.visibility = "visible";
  for (var i = 0; i < expandIcons.length; i++) {
    expandIcons[i].style.transform = "rotate(0deg)";
  }
}
// Close side menu
function closeSideNav() {
  var sideDropdownContainer = document.getElementsByClassName("side-dropdown-container");
  var expandIcons = document.getElementsByClassName("more");
  
  document.getElementById("sidenav").style.left = "-77.5%";
  document.getElementById("screen-dim").style.opacity = 0;
  document.getElementById("screen-dim").style.visibility = "hidden";

  for (var i = 0; i < sideDropdownContainer.length; i++) {
    sideDropdownContainer[i].style.display = "none";
  }
  for (var i = 0; i < expandIcons.length; i++) {
    expandIcons[i].style.transform = "rotate(0deg)";
  }
}
// Hide menu on bigger screens
function hideMenuOnBigScreen() {
  if (window.innerWidth > 555) {
    closeSideNav();
  }
}
// Expand dropdowns when clicked
function sideDropdownFunction(dropdown) {  
  expandSideDropIcon(dropdown);

  var sideDropdownContent = dropdown.nextElementSibling;
  if (sideDropdownContent.style.display === "block") {
    sideDropdownContent.style.display = "none";
  } else {
    sideDropdownContent.style.display = "block";
  }
}
// Rotate the icon to show expansion
function expandDropIcon(dropdown) {
  expandIcon(dropdown.firstElementChild);
}
function expandSideDropIcon(sideNavButton) {
  expandIcon(sideNavButton.firstElementChild.nextElementSibling);
}
function expandIcon(icon) {
  if (icon.style.transform === "rotate(0deg)") {
    icon.style.transform = "rotate(180deg)";
  } else {
    icon.style.transform = "rotate(0deg)";
  }
}

function scheduleResizeFunction() {
  var schedule = document.getElementById("schedule");
  var location = document.getElementById("location");
  var navbar = document.getElementsByClassName("navbar")[0];
  var overlay = document.getElementById("overlay");
  
  if (window.innerWidth > 1270) {
    schedule.style.height = location.offsetHeight + "px";
    location.style.height = "auto";
  } else if (window.innerWidth > 925) {
    location.style.height = schedule.offsetHeight + "px";
    schedule.style.height = "auto";
  } else {
    schedule.style.height = "auto";
    location.style.height = "auto";
  }
  if (window.innerWidth > 925) {
    //location.style.marginTop = navbar.offsetHeight + overlay.offsetHeight + 10 + "px";
  } else {
    //location.style.marginTop = 0;
  }
}

var dropdownTemp = document.getElementsByClassName("dropdown-content");
var expandTemp = document.getElementsByClassName("more");

for (var z = 0; z < dropdownTemp.length; z++) {
  dropdownTemp[z].style.visibility = "hidden";
  expandTemp[z].style.transform = "rotate(0deg)";
}

function toggleDropdown(dropdown) {
  expandDropIcon(dropdown);
  var dropdownContent = dropdown.nextElementSibling;
  var dropdownContents = document.getElementsByClassName("dropdown-content");
  
  for (var i = 0; i < dropdownContents.length; i++) {
    if (dropdownContent != dropdownContents[i]) {
      hideDropdownContent(dropdownContents[i]);
    }
  }
  if (dropdownContent.style.visibility === "hidden") {
    darkenDropdown(dropdown);
    revealDropdownContent(dropdownContent);
  } else {
    hideDropdownContent(dropdownContent);
  }
}

function revealDropdownContent(dropdownContent) {
  var height = 0;
  dropdownContent.style.visibility = "visible";
  dropdownContent.style.opacity = 1;
  for (var j = 0; j < dropdownContent.childElementCount; j++) {
    height += dropdownContent.children[j].offsetHeight;
  }
  dropdownContent.style.height = height + "px";  
}
function hideDropdownContent(dropdownContent) {
  dropdownContent.style.visibility = "hidden";
  dropdownContent.style.opacity = 0;
  dropdownContent.style.height = 0;
  dropdownContent.previousElementSibling.firstElementChild.style.transform = "rotate(0deg)";
  lightenDropdown(dropdownContent.previousElementSibling);
}

function hideAllDropdownContents() {
  var dropdownContent = document.getElementsByClassName("dropdown-content");
  for (var i = 0; i < dropdownContent.length; i++) {
    hideDropdownContent(dropdownContent[i]);
  }
}

function darkenDropdown(dropdown) {
  dropdown.style.backgroundColor = primaryColorDark;
}
function lightenDropdown(dropdown) {
  if (dropdown.nextElementSibling.style.visibility === "hidden") {
    dropdown.style.backgroundColor = primaryColorBase;
  }
}
/*var hidden = new Array(document.getElementsByClassName("dropdown").length);

function hideDropdown() {
  var dropdowns = document.getElementsByClassName("dropdown");
  var dropdownButtons = document.getElementsByClassName("dropdown-button");
  var language = document.getElementById("language");
  if (window.innerWidth > 555) {
    for (var i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].offsetLeft + dropdowns[i].offsetWidth > language.offsetLeft - 10 || dropdowns[i].offsetTop >= dropdowns[0].offsetHeight + dropdowns[0].offsetTop) {
        hidden[i] = dropdowns[i].offsetLeft + dropdowns[i].offsetWidth;
        dropdowns[i].style.display = "none";
      } else {
        if (hidden[i] < language.offsetLeft - 10 && dropdowns[i].offsetTop < dropdowns[0].offsetHeight + dropdowns[0].offsetTop) {
          dropdowns[i].style.display = "block";
        }
      }
    }
  }
}*/
function headerWidth() {
  var header = document.getElementById("header");
  var headerImg = document.getElementById("header-img");
  var headerImgLink = document.getElementById("header-img-link");
  var overlay = document.getElementById("overlay");
  var headerContainer = document.getElementsByClassName("header-container")[0];
  var verticalMargin;
  if ((overlay.offsetHeight - header.offsetHeight) / 2 > 0) {
    verticalMargin = (overlay.offsetHeight - header.offsetHeight) / 2;
  }
  header.style.marginTop = verticalMargin + "px";  
  header.style.padding = 0;

  headerImg.src = "Images/Logos/Logo.png";
  
  if (window.innerWidth <= 1000 && window.innerWidth >= 556) {
    if (window.innerWidth - headerImg.offsetWidth - 18 >= 343) {
      header.style.width = window.innerWidth - headerImg.offsetWidth - 18 + "px";
    }
    if ((overlay.offsetHeight - header.offsetHeight) / 2 > 0) {
      verticalMargin = (overlay.offsetHeight - header.offsetHeight) / 2;
    }
    header.style.padding = 0;
    header.style.margin = 0;
    header.style.marginRight = "5px";
    header.style.marginTop = verticalMargin + "px";
    header.style.transition = "0s";
    headerContainer.style.justifyContent = "flex-end";
  } else if (window.innerWidth <= 555) {
    headerContainer.style.justifyContent = "flex-start";
    headerImg.src = "Images/Logos/Logo-White.png";
    header.style.transition = "0s";
  } else {
    header.style.width = "auto";
    header.style.marginTop = "27.5px";
    headerContainer.style.justifyContent = "center";
  }
}

// Position the first contents just below the navigation bar
function contentYPos() {
  var overlay = document.getElementById("overlay");
  var firstContent = document.getElementsByClassName("first")[0];
  var navbar = document.getElementsByClassName("navbar")[0];
  var body = document.body;
  var verticalMargin = overlay.offsetHeight + navbar.offsetHeight;
  if (window.innerWidth <= 555) {
    overlay.style.transition = "0s";
  } else {
    overlay.style.transition = "0.4s";
  }
  if (window.innerWidth > 555) {
    body.style.marginTop = "156px";
    if (!(body.style.marginTop === verticalMargin + "px") || body.style.marginTop === "") {
      body.style.marginTop = verticalMargin + "px";
    }
  } else {
    body.style.marginTop = "60px";
  }
}

/*function expandBottomBar() {
  document.getElementById("bottom-bar").style.height = "50px";
}
function collapseBottomBar() {
  document.getElementById("bottom-bar").style.height = "7.5px";
}*/
function toggleDisabilityVisibility(disabilityButton) {
  var disabilityContent = disabilityButton.nextElementSibling;
  var expandSymbol = disabilityButton.firstElementChild;
  
  expandSymbol.classList.toggle("change-expand");
  
  disabilityContent.style.transition = "0.3s";
  
  if (disabilityContent.style.height === "0px" || disabilityContent.style.height == 0) {
    expandDisability(disabilityButton, disabilityContent);
  } else {
    collapseDisability(disabilityButton, disabilityContent);
  }
}

function expandDisability(disabilityButton, disabilityContent) {
  disabilityButtonOnExpand(disabilityButton);
  revealDisabilityContent(disabilityContent);
}
function collapseDisability(disabilityButton, disabilityContent) {
  disabilityButtonOnCollapse(disabilityButton);
  hideDisabilityContent(disabilityContent);
}

function disabilityButtonOnExpand(disabilityButton) {
  darkenDisabilityButton(disabilityButton);
  disabilityButton.style.borderRadius = "5px 5px 0 0";
}
function disabilityButtonOnCollapse(disabilityButton) {
  lightenDisabilityButton(disabilityButton);
  disabilityButton.style.borderRadius = "5px";
}

function revealDisabilityContent(disabilityContent) {
  var height = 0;
  for (var i = 0; i < disabilityContent.childElementCount; i++) {
    height += disabilityContent.children[i].offsetHeight;
  }
  disabilityContent.style.height = height + "px";  
}
function hideDisabilityContent(disabilityContent) {
  disabilityContent.style.height = 0;
}

function darkenDisabilityButton(disabilityButton) {
  disabilityButton.style.backgroundColor = "#002f6c";  
}
function lightenDisabilityButton(disabilityButton) {
  if (disabilityButton.nextElementSibling.style.height === "0px" || disabilityButton.nextElementSibling.style.height == 0) {
  disabilityButton.style.backgroundColor = "#01579B";
  }
}

function checkDisabilityContentHeight() {
  var disabilityContent = document.getElementsByClassName("disability-content");
  for (var i = 0; i < disabilityContent.length; i++) {
    var height = 0;
    disabilityContent[i].style.transition = "0s";
    if (disabilityContent[i].style.height !== "0px" && disabilityContent[i].style.height != 0) {
      for (var j = 0; j < disabilityContent[i].childElementCount; j++) {
        height += disabilityContent[i].children[j].offsetHeight;
      }
      disabilityContent[i].style.height = height + "px";
    }
  }
}
var LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet porttitor risus. Mauris vel nibh felis. Maecenas lobortis ultricies nunc, at facilisis erat feugiat vitae. Fusce pellentesque ut est a feugiat. Phasellus elementum enim ut nisl tristique eleifend. Praesent dolor lacus, ultrices sed gravida ut, imperdiet convallis ipsum. Maecenas aliquet aliquet mauris, vitae mollis sem rhoncus at. Maecenas rhoncus nibh a est tristique, ac pellentesque orci congue. Donec feugiat metus neque. Duis faucibus eros at est convallis, ut ultrices ipsum convallis. Cras interdum sapien vitae augue fermentum volutpat. Integer accumsan nisl metus, ut sodales tellus varius in. Fusce euismod placerat felis eu efficitur. Etiam mollis tortor et risus tincidunt bibendum. Duis finibus non turpis sit amet tempus. Suspendisse lobortis urna aliquet, interdum eros et, euismod ex.";

/*var coachFullDescriptions = 
    ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet porttitor risus. Mauris vel nibh felis. Maecenas lobortis ultricies nunc, at facilisis erat feugiat vitae. Fusce pellentesque ut est a feugiat.", 
     
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet porttitor risus. Mauris vel nibh felis. Maecenas lobortis ultricies nunc, at facilisis erat feugiat vitae. Fusce pellentesque ut est a feugiat.",
     
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet porttitor risus. Mauris vel nibh felis. Maecenas lobortis ultricies nunc, at facilisis erat feugiat vitae. Fusce pellentesque ut est a feugiat."];

var coachShortDescriptions = 
    ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet porttitor risus.",
     
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet porttitor risus.",
     
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet porttitor risus."];*/

var coachWidth;

function expandCoachInfo(coachInfo) {
  /*var index;
  var coaches = document.getElementsByClassName("coaches");

  for (var i = 0; i < coaches.length; i++) {
    if (coachInfo.id === coaches[i].id) {
      index = i;
    }
  }*/
  
  var index;
  for (var i = 0; i < coachInfo.children[1].children.length; i++) {
    if (coachInfo.children[1].children[i].className === "coach-description-container") {
      index = i;
    }
  }
  var coachDescriptionContainer = coachInfo.children[1].children[index];
  
  checkCoachWidth();
  expandCoachBlock(coachInfo);
  expandCoachDescription(coachDescriptionContainer);
  
  //coachFullDescription(coachInfo.children[1].children[1], index);
}

function collapseCoachInfo(coachInfo) {
  /*var index;
  var coaches = document.getElementsByClassName("coaches"); 
  
  for (var i = 0; i < coaches.length; i++) {
    if (coachInfo.id === coaches[i].id) {
      index = i;
    }
  }*/

  var index;
  for (var i = 0; i < coachInfo.children[1].children.length; i++) {
    if (coachInfo.children[1].children[i].className === "coach-description-container") {
      index = i;
    }
  }
  var coachDescriptionContainer = coachInfo.children[1].children[index];
  
  collapseCoachBlock(coachInfo);
  collapseCoachDescription(coachDescriptionContainer);
  
  //coachShortDescription(coachInfo.children[1].children[1], index);  
}

function expandCoachBlock(coachInfo) {
  coachInfo.style.transition = "0.3s";
  coachInfo.style.boxShadow = "0 7.5px 15px rgba(0, 0, 0, 0.4)";
  
  if (window.innerWidth > 555) {
    coachInfo.style.marginTop = "10px";
    coachInfo.style.marginBottom = "10px";
  }
  if (window.innerWidth > 925) {
    coachInfo.style.marginLeft = "-5px";
    if (coachInfo.id === "coach-3") {
      coachInfo.style.marginRight = "-5px";
    } else {
      coachInfo.style.marginRight = "15px";
    }
    coachInfo.style.maxWidth = coachWidth + 10 + "px";
    coachInfo.style.width = coachWidth + 10 + "px";
  }
}
function collapseCoachBlock(coachInfo) {
  coachInfo.style.transition = "0.3s";
  coachInfo.style.boxShadow = "none";
  
  if (window.innerWidth > 555) {
    coachInfo.style.marginTop = "20px";
    coachInfo.style.marginBottom = 0;
  }
  if (window.innerWidth > 925) {
    coachInfo.style.marginLeft = 0;
    if (coachInfo.id === "coach-3") {
      coachInfo.style.marginRight = 0;
    } else {
      coachInfo.style.marginRight = "20px";
    }
    coachInfo.style.maxWidth = coachWidth + "px";
    coachInfo.style.width = coachWidth + "px";
  }

}

function expandCoachDescription(coachDescriptionContainer) {
  coachDescriptionContainer.style.height = coachDescriptionContainer.firstElementChild.offsetHeight + 10 + "px";
}
function collapseCoachDescription(coachDescriptionContainer) {
  coachDescriptionContainer.style.height = "15px";
}

function checkCoachProperties() {
  checkCoachWidth();
  checkCoachTransitions();
  checkCoachMargins();
}

function checkCoachWidth() {
  coachWidth = document.getElementsByClassName("coaches")[0].offsetWidth;
}
function checkCoachTransitions() {
  var coaches = document.getElementsByClassName("coaches");
  for (var i = 0; i < coaches.length; i++) {
    coaches[i].style.transition = "0s";
  }
}
function checkCoachMargins() {
  var coaches = document.getElementsByClassName("coaches");
  for (var i = 0; i < coaches.length; i++) {
    if (window.innerWidth <= 555) {
      coaches[i].style.marginTop = "10px";
      coaches[i].style.marginBottom = 0;
      coaches[2].style.marginBottom = "10px";
    } else {
      if (window.innerWidth <= 925) {
        coaches[i].style.marginRight = 0;
      } else {
        coaches[i].style.marginRight = "20px";
        coaches[2].style.marginRight = 0;
      }
      coaches[i].style.marginTop = "20px";
      coaches[i].style.marginBottom = 0;
    }
  }
}

/*function coachFullDescription(coachDescription, index) {
  coachDescription.innerHTML = coachFullDescriptions[index];
}
function coachShortDescription(coachDescription, index) {
  if (window.innerWidth <= 555) {
    coachDescription.innerHTML = "";
  } else {
    coachDescription.innerHTML = coachShortDescriptions[index];    
  }
}
function coachesContentYPos() {
  var coaches = document.getElementsByClassName("coaches");
  var overlay = document.getElementById("overlay");
  var navbar = document.getElementsByClassName("navbar")[0];
  var verticalMargin = overlay.offsetHeight + navbar.offsetHeight + 10;
  if (window.innerWidth > 925) {
    for (var i = 1; i < coaches.length; i++) {
      if (!(coaches[i].style.marginTop === verticalMargin + "px") || coaches[i].style.marginTop === "") {
        coaches[i].style.marginTop = verticalMargin + "px";
      }
    }
  } else {
    for (var i = 1; i < coaches.length; i++) {
      coaches[i].style.marginTop = "auto";
    }
  }
}*/
/*function updateCoachDescription() {
  var temp = new Array(coachShortDescriptions.length);
  var coachDescriptions = document.getElementsByClassName("coach-description");
  for (var i = 0; i < coachShortDescriptions.length; i++) {
    temp[i] = coachShortDescriptions[i];
  }
  if (window.innerWidth <= 555) {
    for (var i = 0; i < coachDescriptions.length; i++) {
      coachDescriptions[i].innerHTML = "";
    }
  } else {
    for (var i = 0; i < coachDescriptions.length; i++) {
      coachDescriptions[i].innerHTML = coachShortDescriptions[i];
    }
  }
}*/