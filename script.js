
/*
dragElement(document.getElementById("window"));
var welcomeScreen = document.querySelector("#window");
function closeWindow(window) {
  window.style.display = "none"
}
function openWindow(window) {
  window.style.display = "flex"
}
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");
welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});


const icons = document.querySelectorAll('.app-icon');


icons.forEach(icon => {
  const label = icon.querySelector('.app-label');

  
  icon.addEventListener('mouseenter', () => {
    label.style.backgroundColor = '#007acc';
    label.style.borderColor = '#009fff';
  });

  icon.addEventListener('mouseleave', () => {
    label.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    label.style.borderColor = 'rgba(255, 255, 255, 0.2)';
  });
});

function dragElement(element) {
 
  var initialX = 0;s position.
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

 
  if (document.getElementById(element.id + "header")) {
  
   
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
   
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
   
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

 
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/

function updateClock() {
  var time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  var timeText = document.querySelector("#time");
  if (timeText) {
    timeText.textContent = "time: " + time;
  }
}

function closeWindow(windowElement) {
  windowElement.style.display = "none";
}

function openWindow(windowElement) {
  windowElement.style.display = "block";
}

function dragElement(element, handle) {
  var startX;
  var startY;
  var startLeft;
  var startTop;

  handle.addEventListener("pointerdown", function (event) {
    event.preventDefault();
    startX = event.clientX;
    startY = event.clientY;
    startLeft = element.offsetLeft;
    startTop = element.offsetTop;
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener("pointermove", function (event) {
    if (!handle.hasPointerCapture(event.pointerId)) {
      return;
    }
    element.style.left = startLeft + event.clientX - startX + "px";
    element.style.top = startTop + event.clientY - startY + "px";
    element.style.transform = "none";
  });
}

updateClock();
setInterval(updateClock, 1000);

var welcomeScreen = document.querySelector("#window");
var welcomeScreenHeader = document.querySelector("#windowheader") || welcomeScreen;
var welcomeScreenOpen = document.querySelector("#welcomeopen");
var closeButtons = document.querySelectorAll("#welcomeclose");

welcomeScreenOpen.addEventListener("click", function () {
  openWindow(welcomeScreen);
});

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    closeWindow(welcomeScreen);
  });
});

dragElement(welcomeScreen, welcomeScreenHeader);