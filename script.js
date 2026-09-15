
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

icons.forEach(icon => {
  const label = icon.querySelector('.app-label');
  const img = icon.querySelector('.icon-graphic');  

  
  icon.addEventListener('mouseenter', () => {
    label.style.backgroundColor = '#007acc';
    label.style.borderColor = '#009fff';
    
   
    img.style.filter = 'drop-shadow(0px 0px 8px #009fff)';
    label.style.boxShadow = '0px 0px 8px rgba(0, 159, 255, 0.6)';
  });

  
  icon.addEventListener('mouseleave', () => {
    label.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    label.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    
    
    img.style.filter = 'none';
    label.style.boxShadow = 'none';
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

function openGameWindow() {
  openWindow(gameWindow);
  gameWindow.style.left = "50%";
  gameWindow.style.top = "70px";
  gameWindow.style.transform = "translateX(-50%)";
}

function dragElement(element, handle) {
  var startX;
  var startY;
  var startLeft;
  var startTop;
  var dragging = false;

  handle.addEventListener("pointerdown", function (event) {
    event.preventDefault();
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startLeft = element.offsetLeft;
    startTop = element.offsetTop;
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener("pointermove", function (event) {
    if (!dragging || !handle.hasPointerCapture(event.pointerId)) {
      return;
    }
    element.style.left = startLeft + event.clientX - startX + "px";
    element.style.top = startTop + event.clientY - startY + "px";
    element.style.transform = "none";
  });

  handle.addEventListener("pointerup", stopDragging);
  handle.addEventListener("pointercancel", stopDragging);

  function stopDragging(event) {
    dragging = false;
    if (handle.hasPointerCapture(event.pointerId)) {
      handle.releasePointerCapture(event.pointerId);
    }
  }
}

updateClock();
setInterval(updateClock, 1000);

var welcomeScreen = document.querySelector("#window");
var welcomeScreenHeader = document.querySelector("#windowheader") || welcomeScreen;
var welcomeScreenOpen = document.querySelector("#welcomeopen");
var closeButtons = document.querySelectorAll("#welcomeclose");
var gameWindow = document.querySelector("#game-window");
var gameWindowHeader = document.querySelector("#game-window-header");
var gameWindowOpen = document.querySelector("#gameopen");
var gameWindowClose = document.querySelector("#gameclose");
var numberGuess = document.querySelector("#number-guess");
var guessButton = document.querySelector("#guess-button");
var gameMessage = document.querySelector("#game-message");
var targetNumber = Math.floor(Math.random() * 10) + 1;

if (welcomeScreenOpen) {
  welcomeScreenOpen.addEventListener("click", function () {
    openWindow(welcomeScreen);
  });
}

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    closeWindow(welcomeScreen);
  });
});

dragElement(welcomeScreen, welcomeScreenHeader);

gameWindowOpen.addEventListener("click", function () {
  openGameWindow();
});

gameWindowClose.addEventListener("click", function () {
  closeWindow(gameWindow);
});

dragElement(gameWindow, gameWindowHeader);

guessButton.addEventListener("click", function () {
  var guess = Number(numberGuess.value);

  if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
    gameMessage.textContent = "Enter a whole number from 1 to 10.";
    return;
  }

  if (guess === targetNumber) {
    gameMessage.textContent = "Correct! A new number has been chosen.";
    targetNumber = Math.floor(Math.random() * 10) + 1;
    numberGuess.value = "";
  } else if (guess < targetNumber) {
    gameMessage.textContent = "Too low. Try again.";
  } else {
    gameMessage.textContent = "Too high. Try again.";
  }
});