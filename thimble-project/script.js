var primaryColorBase = "#0277BD";
var primaryColorDark = "#004c8c";

var scrolledToBottom = false;

// --- Function Calls ---
allFunctionsForResize();

document.onresize = function() {
  allFunctionsForResize();
}

document.addEventListener('DOMContentLoaded', function() {
  allFunctionsForResize();
}, false);

document.body.onload = function() {
  allFunctionsForResize();
  //hideDropdown();
};

document.getElementById("bottom-bar-container").onmouseover = function() {
  expandBottomBar();
};

document.getElementById("bottom-bar-container").onmouseout = function() {
  if (!scrolledToBottom) {
    shrinkBottomBar();
  }
};

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
    document.getElementById("bottom-bar-container").style.display = "none";
    scrolledToBottom = true;
  } else {
    document.getElementById("bottom-bar-container").style.display = "block";
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
    if (window.innerWidth <= 907) {
      width = (1014 - window.innerWidth) / (182 / 15);
      if (width >= 30) {
        width = 30;
      }
      inline[i].style.maxWidth = 70 + width + "%";
      inline[i].style.marginRight = 0;
    } 
    if (window.innerWidth > 907) {
      inline[i].style.maxWidth = "25%";
      if (!(inline[i].id === "goals" || inline[i].id === "location")) {
        inline[i].style.marginRight = "20px";
      }
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
  var x = document.getElementsByClassName("slideshow");
  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slidesIndex++;
  if (slidesIndex > x.length) {
    slidesIndex = 1
  }
  x[slidesIndex - 1].style.display = "block";
  slidesResize();
  setTimeout(carousel, 7000);
}

function slidesResize() {
  var slides = document.getElementsByClassName("slides");
  for (var i = 0; i < slides.length; i++) {
    if (slides[i].style.maxHeight === "") {
      slides[i].style.maxHeight = slides[i].offsetWidth * (338 / 575) + "px";
    }
    slides[i].style.maxHeight = slides[i].offsetWidth * (338 / 575) + "px";
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
  } else if (window.innerWidth > 907) {
    location.style.height = schedule.offsetHeight + "px";
    schedule.style.height = "auto";
  } else {
    schedule.style.height = "auto";
    location.style.height = "auto";
  }
  if (window.innerWidth > 907) {
    location.style.marginTop = navbar.offsetHeight + overlay.offsetHeight + 10 + "px";
  } else {
    location.style.marginTop = 0;
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
    showDropdownContent(dropdown, dropdownContent);
  } else {
    hideDropdownContent(dropdownContent);
  }
}
function showDropdownContent(dropdown, dropdownContent) {
  var height = 0;
  dropdownContent.style.visibility = "visible";
  dropdownContent.style.opacity = 1;
  for (var j = 0; j < dropdownContent.childElementCount; j++) {
    height += dropdownContent.children[j].offsetHeight;
  }
  dropdownContent.style.height = height + "px";
  darkenDropdown(dropdown);
}
function hideDropdownContent(dropdownContent) {
  dropdownContent.style.visibility = "hidden";
  dropdownContent.style.opacity = 0;
  dropdownContent.style.height = 0;
  dropdownContent.previousElementSibling.firstElementChild.style.transform = "rotate(0deg)";
  lightenDropdown(dropdownContent.previousElementSibling);
}
function hideAllDropdownContents() {
  for (var i = 0; i < document.getElementsByClassName("dropdown-content").length; i++) {
    hideDropdownContent(document.getElementsByClassName("dropdown-content")[i]);
  }
}
var hidden = new Array(document.getElementsByClassName("dropdown").length);

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
}
function darkenDropdown(dropdown) {
  dropdown.style.backgroundColor = primaryColorDark;
}
function lightenDropdown(dropdown) {
  if (dropdown.nextElementSibling.style.visibility === "hidden") {
    dropdown.style.backgroundColor = primaryColorBase;
  }
}
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

  headerImg.src = "Logo.png";
  
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
  } else if (window.innerWidth < 556) {
    headerContainer.style.justifyContent = "flex-start";
    headerImg.src = "Logo-White.png";
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
  var verticalMargin = overlay.offsetHeight + navbar.offsetHeight + 10;
  if (window.innerWidth <= 555) {
    overlay.style.transition = "0s";
  } else {
    overlay.style.transition = "0.4s";
  }
  if (window.innerWidth > 555) {
    //firstContent.style.marginTop = "156px";
    if (!(firstContent.style.marginTop === verticalMargin + "px") || firstContent.style.marginTop === "") {
      firstContent.style.marginTop = verticalMargin + "px";
    }
  } else {
    firstContent.style.marginTop = "60px";
  }
}

function expandBottomBar() {
  document.getElementById("bottom-bar").style.height = "50px";
}
function shrinkBottomBar() {
  document.getElementById("bottom-bar").style.height = "7.5px";
}